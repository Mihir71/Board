import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplaySelector.css';
import displayIcon from '../assets/icons_FEtask/Display.svg';
import arroricon from '../assets/icons_FEtask/down.svg';
import ProjectBoard from './Board'; 
import UserBoard from './User';
import PriorityBoard from './Priority'; 

const DisplaySelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') || 'priority');
  const [apiData, setApiData] = useState({ tickets: [], users: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setApiData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupByChange = (value) => {
    setGroupBy(value);
    localStorage.setItem('groupBy', value);
    setIsDropdownOpen(false); 
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value);
    localStorage.setItem('orderBy', value);
    setIsDropdownOpen(false); 
  };

  return (
    <div className='top'>
      <div className="display-selector">
        <div className="display-button" onClick={toggleDropdown}>
          <span className="display-icon">
            <img src={displayIcon} alt="Display icon" />
          </span>
          <span className="text">Display</span>
          <span className="arrow">
            <img src={arroricon} alt="Arrow icon" />
          </span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="selector-group">
              <label>Grouping</label>
              <select value={groupBy} onChange={(e) => handleGroupByChange(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">By User</option>
                <option value="priority">By Priority</option>
              </select>
            </div>

            <div className="selector-group">
              <label>Ordering</label>
              <select value={orderBy} onChange={(e) => handleOrderByChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {groupBy === 'status' && (
       <ProjectBoard orderBy={orderBy} tasks={apiData.tickets} users={apiData.users} />

      )}
      {groupBy === 'user' && (
        <UserBoard users={apiData.users} tickets={apiData.tickets} orderBy={orderBy} />
      )}
      {groupBy === 'priority' && (
        <PriorityBoard tickets={apiData.tickets} orderBy={orderBy} />
      )}
    </div>
  );
};

export default DisplaySelector;
