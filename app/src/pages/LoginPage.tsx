import {FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(
    localStorage.getItem('hotelBookingUserId') ?? '000000000000000000000001',
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem('hotelBookingUserId', userId);
    navigate('/hotels');
  }

  return (
    <section className="panel narrow">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          User ID
          <input
            value={userId}
            onChange={event => setUserId(event.target.value)}
            placeholder="Enter MongoDB user id"
            required
          />
        </label>
        <button type="submit">Continue</button>
      </form>
    </section>
  );
}
