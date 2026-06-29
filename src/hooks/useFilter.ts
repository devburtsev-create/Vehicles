import { useState, useMemo } from 'react';
import type { Vehicle } from '../types';
import { useDebounce } from './useDebounce';
import { filterVehicles } from '../utils/vehicles';

const DEBOUNCE_MS = 300;

export function useFilter(vehicles: Vehicle[]) {
  const [filterText, setFilterText] = useState('');
  const debouncedFilter = useDebounce(filterText, DEBOUNCE_MS);

  const filtered = useMemo(
    () => filterVehicles(vehicles, debouncedFilter),
    [vehicles, debouncedFilter]
  );

  const filtering = filterText !== debouncedFilter;

  return { filterText, setFilterText, filtered, filtering };
}
