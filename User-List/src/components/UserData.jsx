import React, { useEffect, useState } from 'react';
import "../Styles/UserData.css"; // Assuming you create a CSS file for styling

const UserData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result);
      setFilteredData(result);
    } catch (err) {
      setError(err.message);
    } 
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    setFilteredData(data.filter(user => user.name.toLowerCase().includes(searchValue)));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-data-container">
      <input
        type='text'
        value={search}
        placeholder='Search by name'
        onChange={handleChange}
        className="search-input"
      />
      <ul className="user-list">
        {filteredData.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserData;
