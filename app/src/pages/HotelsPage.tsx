import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {apiClient} from '../api/client';
import {Hotel} from '../types';

export function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHotels() {
      try {
        const response = await apiClient.get<Hotel[]>('/hotels');
        setHotels(response.data);
      } catch {
        setError('Could not load hotels.');
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, []);

  if (loading) {
    return <p>Loading hotels...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Hotels</h1>
        <span>{hotels.length} found</span>
      </div>

      <div className="grid">
        {hotels.map(hotel => (
          <article className="card" key={hotel.id}>
            <h2>{hotel.title}</h2>
            <p>
              {hotel.city}, {hotel.address}
            </p>
            <p>{hotel.description}</p>
            <p>Rating: {hotel.rating}</p>
            <Link to={`/hotels/${hotel.id}`}>View rooms</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
