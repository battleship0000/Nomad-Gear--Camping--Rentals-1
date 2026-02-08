
export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  capacity: string;
  image: string;
}

export interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}
