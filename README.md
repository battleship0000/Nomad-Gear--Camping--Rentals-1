# Nomad Gear | Deployment Guide

Follow these steps to take this website live so you can share the link with your friends!

## 🏁 Step 1: Prepare your files
1. Download all the files from this project.
2. Put them into a single folder on your computer.

## 🐙 Step 2: Upload to GitHub
1. Create a free account on [GitHub.com](https://github.com).
2. Create a "New Repository" named `nomad-gear`.
3. Upload all your files to this repository.

## 🚀 Step 3: Connect to Netlify (Recommended)
Netlify is the easiest way to get a public link.
1. Create a free account on [Netlify.com](https://netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Connect your GitHub account and select your `nomad-gear` repository.
4. **Important**: Under "Build settings", you don't need a build command because this app uses ESM. Just set the "Publish directory" to `.` (the root).

## 🔑 Step 4: Add your API Key (Fixes Blank Screen/Errors)
Your AI features need a key to work on the real web.
1. In your Netlify dashboard, go to **Site Settings** > **Environment variables**.
2. Add a new variable:
   - **Key**: `API_KEY`
   - **Value**: (Paste your Gemini API Key here)
3. Go to **Deploys** and click **"Trigger deploy"** > **"Clear cache and deploy site"**.

## 🌲 Sharing
Once finished, Netlify will give you a link like `https://awesome-nomad-gear.netlify.app`. You can share this link with anyone! They will see your beautiful website without seeing the Google AI Studio code editor.

---
### Technical Support
If the screen is white:
- Open your browser's "Inspect" tool (F12) and look at the "Console" tab.
- It will tell you exactly which file failed to load. 
- Ensure your `index.html` has `<script type="module" src="index.tsx"></script>` at the bottom.