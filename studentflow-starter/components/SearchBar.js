"use client";

export default function SearchBar({ value, onChange, placeholder }) {
  // TODO: Build your controlled SearchBar component here
  return (
    <div className="search-bar-wrapper">
      <span className="search-icon">🔍</span>
      {/* TODO: Add input connected to value and onChange */}

      <input
        placeholder={placeholder}
        className="search-input"
        aria-label="Search"
        type="text"
        value={value}
        onChange={(e) => onChange(event.target.value)}
      />
    </div>
  );
}
