// SortDropdown.tsx
import React from 'react';

interface SortDropdownProps {
  sortOption: string;
  onSortChange: (sort: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, onSortChange }) => {
  return (
    <select
      className="p-2 rounded border text-black ml-4"
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)} // Update sortOption on change
    >
      <option value="default">Sort By</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
      <option value="rating-desc">Rating: High to Low</option>
      <option value="title">Title: A-Z</option>
    </select>
  );
};

export default SortDropdown;
