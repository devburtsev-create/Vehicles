import { useState, useMemo } from 'react';
import type { Vehicle } from '../types';

export function useSort(vehicles: Vehicle[]) {
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    return [...vehicles].sort((a, b) => {
      const pa = a.price ?? 0;
      const pb = b.price ?? 0;
      return sortAsc ? pa - pb : pb - pa;
    });
  }, [vehicles, sortAsc]);

  return { sortAsc, setSortAsc, sorted };
}
