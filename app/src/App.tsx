import {NavLink, Navigate, Route, Routes} from 'react-router-dom';
import {HotelDetailsPage} from './pages/HotelDetailsPage';
import {HotelsPage} from './pages/HotelsPage';
import {LoginPage} from './pages/LoginPage';
import {MyBookingsPage} from './pages/MyBookingsPage';

export function App() {
  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/hotels" className="brand">
          Hotel Booking
        </NavLink>
        <nav>
          <NavLink to="/hotels">Hotels</NavLink>
          <NavLink to="/my-bookings">My bookings</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/hotels" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
