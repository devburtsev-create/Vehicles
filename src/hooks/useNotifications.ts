import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useNotifications() {
  const notifySuccess = useCallback((message: string) => {
    toast.success(message, { duration: 3000 });
  }, []);

  const notifyError = useCallback((message: string) => {
    toast.error(message, { duration: 4000 });
  }, []);

  return { notifySuccess, notifyError };
}
