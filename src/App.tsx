import { Toaster } from 'react-hot-toast';
import './App.css';
import VehicleList from './components/VehicleList';

export default function App() {
  return (
    <main className="app">
      <h1 className="app-title">Vehicles</h1>
      <VehicleList />
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '14px' } }} />
    </main>
  );
}
