export type Hotel = {
  id?: string;
  title: string;
  city: string;
  address: string;
  description: string;
  rating: number;
};

export type RoomStatus = 'available' | 'booked';

export type Room = {
  id?: string;
  hotelId: string;
  number: string;
  price: number;
  capacity: number;
  status: RoomStatus;
};

export type BookingStatus = 'active' | 'cancelled';

export type Booking = {
  id?: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  createdAt: string;
};
