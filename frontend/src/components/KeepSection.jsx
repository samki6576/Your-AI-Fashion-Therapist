import { WardrobeGrid } from './WardrobeGrid';

export const KeepSection = ({ items, onDelete }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-green-500 rounded"></div>
        <h2 className="text-2xl font-bold">Keep ({items.length})</h2>
        <span className="ml-auto text-green-500 text-sm font-semibold">
          {Math.round((items.length / (items.length || 1)) * 100)}%
        </span>
      </div>
      <WardrobeGrid items={items} onDelete={onDelete} />
    </div>
  );
};
