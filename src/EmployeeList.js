import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setEmployees(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            <img src={employee.avatar} alt={employee.first_name} />
            {employee.first_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
