import {useEffect, useState} from 'react';
import {apiClient} from '../api/client';
import {Booking, Room} from '../types';

export function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Record<string, Room>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      const userId =
        localStorage.getItem('hotelBookingUserId') ??
        '000000000000000000000001';
      const [bookingsResponse, roomsResponse] = await Promise.all([
        apiClient.get<Booking[]>('/bookings', {
          params: {filter: JSON.stringify({where: {userId}})},
        }),
        apiClient.get<Room[]>('/rooms'),
      ]);

      setBookings(bookingsResponse.data);
      setRooms(
        roomsResponse.data.reduce<Record<string, Room>>((acc, room) => {
          if (room.id) {
            acc[room.id] = room;
          }
          return acc;
        }, {}),
      );
      setLoading(false);
    }

    loadBookings();
  }, []);

  async function cancelBooking(bookingId?: string) {
    if (!bookingId) {
      return;
    }

    await apiClient.patch(`/bookings/${bookingId}`, {status: 'cancelled'});
    setBookings(currentBookings =>
      currentBookings.map(booking =>
        booking.id === bookingId ? {...booking, status: 'cancelled'} : booking,
      ),
    );
  }

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <section>
      <div className="page-heading">
        <h1>My bookings</h1>
        <span>{bookings.length} total</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{rooms[booking.roomId]?.number ?? booking.roomId}</td>
                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    type="button"
                    disabled={booking.status === 'cancelled'}
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
