import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../config/axiosConfig';
import { useAuth } from '../../context/auth-context';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const { user: userAuth } = useAuth();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (!search) return;
    http.get(`users?name=${search}`).then((res) => {
      setUsers(res?.data.rows);
    });
  }, [search]);
  return (
    <div className="mt-10 mx-auto w-full max-w-[500px]">
      <div className="w-full h-full relative">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="outline-none w-full rounded-lg px-4 py-2 border border-purple-400"
        />
        {search && (
          <div className="w-full  px-3 py-3 bg-slate-50 shadow-md absolute rounded-lg z-30">
            {users.map((user) => {
              return (
                <div
                  key={user._id}
                  className="w-full px-3 py-2 flex flex-row gap-3 items-center cursor-pointer"
                  onClick={() => {
                    if (user._id === userAuth._id) navigate('/profile');
                    else navigate(`/user/${user._id}`);
                  }}
                >
                  <div className="w-[40px] h-[40px]">
                    <img
                      src="https://images.unsplash.com/photo-1669058665299-d6f81125dce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
