// src/types/index.ts

// --- Lineup Features ---
export interface Artist {
  id: string;
  name: string;
  stage: 'Main Stage' | 'Neon Jungle' | 'Bass Arena';
  startTime: string; // e.g., "18:00"
  endTime: string;
  bio: string;
}

// --- Ticket Features ---
export interface Ticket {
  ticketId: string;
  attendeeName: string;
  status: 'valid' | 'checked-in' | 'invalid';
  scannedAt?: string;
}

// --- Food Vendor Features ---
export interface Vendor {
  id: string;
  name: string;
  menu: { item: string; price: number }[];
  waitTime: number; // in minutes
  dietary: ('vegan' | 'gluten-free' | 'halal')[];
}

// --- Lost & Found Features ---
export interface LostItem {
  id: string;
  itemName: string;
  description: string;
  status: 'lost' | 'found' | 'claimed';
  reportedAt: string;
}
