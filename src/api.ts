import type { Vehicle } from './types';

const vehicles: Vehicle[] = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2015, price: null },
  { id: 2, make: 'Jeep', model: 'Wrangler', year: 2019, price: 30000 },
  { id: 3, make: 'Audi', model: 'A4', year: 2017, price: 25000 },
  { id: 4, make: 'Jeep', model: 'Cherokee', year: 2020, price: null },
  { id: 5, make: 'BMW', model: 'X3', year: 2018, price: 37000 },
];

export const fetchVehicles = (): Promise<Vehicle[]> =>
  new Promise((resolve) => setTimeout(() => resolve(vehicles), 1000));

export const updatePrice = (
  _vehicleId: number,
  price: number | null
): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (price !== null && price < 0) {
        reject(new Error('Price cannot be negative'));
        return;
      }
      resolve();
    }, 800);
  });
