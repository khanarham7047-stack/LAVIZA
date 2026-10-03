export type Currency = 'INR' | 'USD';

export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'manual-brew' | 'bakery' | 'teas-botanicals' | 'signature-cold';
  description: string;
  priceINR: number;
  priceUSD: number;
  image?: string;
  origin?: string;
  roastLevel?: 'Light Roast' | 'Medium Roast' | 'Medium Dark' | 'Dark Roast';
  flavorNotes: string[];
  dietary?: ('Vegan' | 'Vegetarian' | 'Gluten-Free Option' | 'Dairy-Free Option' | 'House Specialty')[];
  prepTimeMinutes: number;
  caffeine: 'High' | 'Medium' | 'Low' | 'Decaf';
  calories?: number;
}

export interface CartItemOption {
  size: 'Regular (240ml)' | 'Large (350ml)';
  milk: 'Whole Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹50)' | 'Pistachio Cream (+₹60)' | 'No Milk (Black)';
  sweetness: 'No Sugar' | '50% Subtle' | 'Standard' | 'Organic Jaggery / Maple';
  temperature?: 'Hot' | 'Iced';
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: CartItemOption;
  unitPriceINR: number;
  unitPriceUSD: number;
}

export interface TableReservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: 'The Sunlit Conservatory' | 'The Espresso Bar Counter' | 'The Velvet Library Nook' | 'The Outdoor Botanical Terrace';
  specialOccasion?: string;
  specialRequests?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending';
}

export interface Review {
  id: string;
  author: string;
  roleOrCity: string;
  rating: number;
  date: string;
  comment: string;
  recommendedItem: string;
  avatarInitials: string;
}
