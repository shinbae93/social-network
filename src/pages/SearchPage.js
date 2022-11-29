import React, { useEffect, useState } from 'react';
import http from '../config/axiosConfig';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    http.get(`users?name=${search}`).then((res) => {
      console.log(res);
    });
  }, [search]);
  return (
    <div className="mt-10 mx-auto w-full max-w-[800px]">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        className="outline-none w-full rounded-lg px-5 py-3 border border-purple-400"
      />
    </div>
  );
};

export default SearchPage;
