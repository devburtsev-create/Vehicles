import { useDeferredValue } from 'react';
import { NumericFormat } from 'react-number-format';
import { useVehicles } from '../hooks/useVehicles';
import { useEditPrice } from '../hooks/useEditPrice';
import { useFilter } from '../hooks/useFilter';
import { useSort } from '../hooks/useSort';
import { useNotifications } from '../hooks/useNotifications';

function formatPrice(price: number | null): string {
  return price !== null ? `$${price.toLocaleString()}` : '—';
}

export default function VehicleList() {
  const { vehicles, setVehicles, loading } = useVehicles();
  const { notifySuccess, notifyError } = useNotifications();
  const {
    editingId,
    editValue,
    setEditValue,
    optimisticVehicles,
    handleEdit,
    handleSave,
    handleCancel,
  } = useEditPrice(vehicles, setVehicles, notifySuccess, notifyError);
  const { filterText, setFilterText, filtered, filtering } =
    useFilter(optimisticVehicles);
  const { sortAsc, setSortAsc, sorted } = useSort(filtered);

  const deferredSorted = useDeferredValue(sorted);
  const stale = deferredSorted !== sorted;

  if (loading) {
    return <div className="loading">Loading vehicles…</div>;
  }

  return (
    <div className="vehicle-list">
      <header className="toolbar">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by make, model, year, price…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="sort-btn" onClick={() => setSortAsc((p) => !p)}>
          Sort by Price {sortAsc ? '↑' : '↓'}
        </button>
      </header>

      {filtering && <p className="filtering-msg">Filtering…</p>}

      {deferredSorted.length === 0 ? (
        <p className="empty">No vehicles match your filter.</p>
      ) : (
        <ul className="list" style={{ opacity: stale && filtering ? 0.5 : 1 }}>
          {deferredSorted.map((v) => (
            <li key={v.id} className="vehicle-row">
              <span className="vehicle-info">
                <strong>{v.make}</strong> {v.model} ({v.year})
              </span>

              <span className="vehicle-price">
                {editingId === v.id ? (
                  <>
                    <NumericFormat
                      className="price-input"
                      value={editValue}
                      onValueChange={(values) => setEditValue(values.value)}
                      allowNegative={false}
                      decimalScale={0}
                      autoFocus
                    />
                    <button
                      className="save-btn"
                      onClick={() => handleSave(v)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="price-value">{formatPrice(v.price)}</span>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(v)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
