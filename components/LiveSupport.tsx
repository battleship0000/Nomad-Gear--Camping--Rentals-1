
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, X, Loader2, Volume2, Headset } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// Audio decoding/encoding helpers as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const toggleSupport = async () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: any) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev.slice(-4), `AI: ${message.serverContent.outputTranscription.text}`]);
            }
            
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outContextRef.current) {
              const ctx = outContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: () => stopSession(),
          onclose: () => stopSession(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: 'You are a helpful camping expert for Nomad Gear. Your job is to answer questions about camping gear, recommend packages, and give outdoor safety tips. Be enthusiastic and friendly.',
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
        }
      });

      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error(err);
      stopSession();
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    streamRef.current?.getTracks().forEach(t => t.stop());
    audioContextRef.current?.close();
    outContextRef.current?.close();
    setTranscription([]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border border-sage/10 animate-fade-up">
          <div className="bg-sage p-6 text-cream flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-cream/30'}`} />
              <span className="font-bold">Live AI Expert</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          
          <div className="p-6 h-64 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-hide">
              {transcription.length === 0 && !isActive && (
                <p className="text-sage-dark/40 text-sm italic text-center mt-12">
                  Connect to speak with our AI camping expert.
                </p>
              )}
              {transcription.map((t, i) => (
                <div key={i} className="text-sm p-3 bg-sage/5 rounded-2xl text-sage-dark">
                  {t}
                </div>
              ))}
            </div>

            <button
              onClick={toggleSupport}
              disabled={isConnecting}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                isActive 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-sage text-cream hover:bg-sage-dark'
              }`}
            >
              {isConnecting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isActive ? (
                <>
                  <MicOff className="w-5 h-5" />
                  End Session
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  Start Voice Chat
                </>
              )}
            </button>
          </div>
          
          <div className="px-6 py-4 bg-sage/5 text-[10px] text-sage-dark/40 uppercase tracking-widest text-center">
            Powered by Gemini Live API
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-sage text-cream rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Headset className="w-6 h-6 group-hover:animate-float" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-tan text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            AI LIVE
          </span>
        )}
      </button>
    </div>
  );
};

export default LiveSupport;
