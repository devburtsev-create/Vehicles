import { useState, useOptimistic, startTransition } from 'react';
import type { Vehicle } from '../types';
import { updatePrice } from '../api';

export function useEditPrice(
  vehicles: Vehicle[],
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>,
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const [optimisticVehicles, addOptimisticUpdate] = useOptimistic(
    vehicles,
    (state, action: { id: number; price: number | null }) =>
      state.map((v) =>
        v.id === action.id ? { ...v, price: action.price } : v
      )
  );

  function handleEdit(vehicle: Vehicle) {
    setEditingId(vehicle.id);
    setEditValue(vehicle.price?.toString() ?? '');
  }

  function handleSave(vehicle: Vehicle) {
    const newPrice = editValue === '' ? null : Number(editValue);
    const label = `${vehicle.make} ${vehicle.model}`;
    setEditingId(null);
    startTransition(() => {
      addOptimisticUpdate({ id: vehicle.id, price: newPrice });
    });
    updatePrice(vehicle.id, newPrice)
      .then(() => {
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === vehicle.id ? { ...v, price: newPrice } : v
          )
        );
        onSuccess?.(`${label} — price updated successfully`);
      })
      .catch(() => {
        onError?.(`${label} — failed to update price`);
      });
  }

  function handleCancel() {
    setEditingId(null);
  }

  return {
    editingId,
    editValue,
    setEditValue,
    optimisticVehicles,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
