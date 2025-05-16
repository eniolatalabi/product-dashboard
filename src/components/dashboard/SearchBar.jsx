import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SearchBar = ({ search, setSearch, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="flex-grow">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" variant="primary">
        <FiSearch className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;