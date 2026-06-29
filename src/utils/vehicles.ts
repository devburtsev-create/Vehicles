import type { Vehicle } from '../types';

export function filterVehicles(vehicles: Vehicle[], query: string): Vehicle[] {
  if (!query) return vehicles;
  const q = query.toLowerCase();
  return vehicles.filter(
    (v) =>
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      String(v.year).includes(q) ||
      (v.price !== null && String(v.price).includes(q)) ||
      (v.price === null && 'no price'.includes(q))
  );
}
