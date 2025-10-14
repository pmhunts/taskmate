import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button 
          className="clear-search" 
          onClick={() => setSearchQuery('')}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;