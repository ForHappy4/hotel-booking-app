import {FormEvent, useEffect, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiClient} from '../api/client';
import {Booking, Hotel, Room} from '../types';

export function HotelDetailsPage() {
  const {id} = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const availableRooms = useMemo(
    () => rooms.filter(room => room.status === 'available'),
    [rooms],
  );

  useEffect(() => {
    async function loadDetails() {
      if (!id) {
        return;
      }

      try {
        const [hotelResponse, roomsResponse] = await Promise.all([
          apiClient.get<Hotel>(`/hotels/${id}`),
          apiClient.get<Room[]>('/rooms', {
            params: {filter: JSON.stringify({where: {hotelId: id}})},
          }),
        ]);

        setHotel(hotelResponse.data);
        setRooms(roomsResponse.data);
        setSelectedRoomId(
          roomsResponse.data.find(room => room.status === 'available')?.id ??
            '',
        );
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!selectedRoomId) {
      setMessage('Select an available room.');
      return;
    }

    const userId =
      localStorage.getItem('hotelBookingUserId') ?? '000000000000000000000001';
    const booking: Omit<Booking, 'id'> = {
      userId,
      roomId: selectedRoomId,
      checkIn,
      checkOut,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await apiClient.post('/bookings', booking);
    setMessage('Booking created.');
  }

  if (loading) {
    return <p>Loading hotel...</p>;
  }

  if (!hotel) {
    return <p className="error">Hotel not found.</p>;
  }

  return (
    <section className="details">
      <Link to="/hotels">Back to hotels</Link>
      <h1>{hotel.title}</h1>
      <p>
        {hotel.city}, {hotel.address}
      </p>
      <p>{hotel.description}</p>
      <p>Rating: {hotel.rating}</p>

      <h2>Rooms</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.number}</td>
                <td>{room.price}</td>
                <td>{room.capacity}</td>
                <td>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="panel">
        <h2>Create booking</h2>
        <form onSubmit={handleBooking} className="form booking-form">
          <label>
            Room
            <select
              value={selectedRoomId}
              onChange={event => setSelectedRoomId(event.target.value)}
              required
            >
              <option value="">Select room</option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.id}>
                  Room {room.number}, {room.capacity} guests
                </option>
              ))}
            </select>
          </label>
          <label>
            Check in
            <input
              type="date"
              value={checkIn}
              onChange={event => setCheckIn(event.target.value)}
              required
            />
          </label>
          <label>
            Check out
            <input
              type="date"
              value={checkOut}
              onChange={event => setCheckOut(event.target.value)}
              required
            />
          </label>
          <button type="submit">Book room</button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>
    </section>
  );
}
