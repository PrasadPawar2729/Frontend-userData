import React, { useEffect, useState } from "react";
import "../Styles/UserData.css";

const UserData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    if (!searchValue) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((user) => user.name.toLowerCase().includes(searchValue))
      );
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-data-container">
      <h2>User Directory</h2>
      <input
        type="text"
        value={search}
        placeholder="🔍 Search by name..."
        onChange={handleChange}
        className="search-input"
      />
      <div className="user-grid">
        {filteredData.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              <span>{user.name.charAt(0)}</span>
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserData;
