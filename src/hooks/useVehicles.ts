import { useState, useEffect } from 'react';
import type { Vehicle } from '../types';
import { fetchVehicles } from '../api';

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles()
      .then(setVehicles)
      .finally(() => setLoading(false));
  }, []);

  return { vehicles, setVehicles, loading };
}
