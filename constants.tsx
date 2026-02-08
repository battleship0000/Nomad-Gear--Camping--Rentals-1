
import { Package, Destination, Testimonial } from './types.ts';

export const PACKAGES: Package[] = [
  {
    id: 1,
    name: "Weekend Light Kit",
    description: "Perfect for quick getaways. Lightweight gear for 2-3 days of mountain or forest hiking.",
    price: 89,
    duration: "2-3 days",
    capacity: "1-2 people",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Family Basecamp",
    description: "Spacious and comfortable setup for the whole family to enjoy nature together with luxury amenities.",
    price: 149,
    duration: "7 days",
    capacity: "4-6 people",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Solo Explorer",
    description: "Ultralight essentials for the independent explorer seeking solitude in the backcountry.",
    price: 69,
    duration: "Flexible",
    capacity: "1 person",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Group Expedition",
    description: "Complete heavy-duty outfit for group adventures. Team up and conquer the most remote areas.",
    price: 249,
    duration: "Up to 14 days",
    capacity: "6-10 people",
    image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?q=80&w=800&auto=format&fit=crop"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Alpine Lake",
    location: "Sierra Nevada, CA",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    description: "Crystal clear waters surrounded by majestic peaks."
  },
  {
    id: 2,
    name: "Redwood Grove",
    location: "Northern California",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    description: "Camp among the world's tallest trees."
  },
  {
    id: 3,
    name: "Coastal Cliffs",
    location: "Big Sur, CA",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=600&auto=format&fit=crop",
    description: "Dramatic ocean views and stunning sunsets."
  },
  {
    id: 4,
    name: "Desert Oasis",
    location: "Joshua Tree, CA",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop",
    description: "Unique rock formations and starry nights."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Weekend Explorer",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    content: "Nomad Gear made our anniversary camping trip absolutely perfect. The equipment was top-notch and the booking process was seamless.",
    rating: 5
  },
  {
    id: 2,
    name: "John Peterson",
    role: "Solo Adventurer",
    avatar: "https://i.pravatar.cc/150?u=john",
    content: "As someone who camps solo frequently, having reliable gear is crucial. Nomad Gear's Solo kit has everything I need without the bulk.",
    rating: 5
  },
  {
    id: 3,
    name: "Mike Thompson",
    role: "Family Camper",
    avatar: "https://i.pravatar.cc/150?u=mike",
    content: "Took the family on our first camping trip. Everything worked perfectly. The tent was spacious and we stayed warm all night.",
    rating: 5
  }
];
