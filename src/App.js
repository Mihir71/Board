import React, { useState, useEffect } from 'react';
import DisplaySelector from './components/DisplaySelector';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Ticket 1', priority: 1, status: 'Todo', description: 'Description for ticket 1' },
    { id: 2, title: 'Ticket 2', priority: 2, status: 'In Progress', description: 'Description for ticket 2' }
  ]);

  const [groupBy, setGroupBy] = useState(() => localStorage.getItem('groupBy') || 'status');
  const [orderBy, setOrderBy] = useState(() => localStorage.getItem('orderBy') || 'priority');


  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('orderBy', orderBy);
  }, [groupBy, orderBy]);

  return (
    <div className="app-container">
      <header className="header">
        <DisplaySelector 
          groupBy={groupBy} 
          setGroupBy={setGroupBy} 
          orderBy={orderBy} 
          setOrderBy={setOrderBy} 
        />
      </header>
    </div>
  );
};

export default App;
