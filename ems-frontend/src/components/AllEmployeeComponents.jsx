import React from 'react'
import { useState} from 'react';
import { useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';

const AllEmployeeComponents = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees()
      }, []);

    const getAllEmployees = () => {
        EmployeeService.getEmployees()
        .then((res) => {
          setEmployees(res.data);
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }

  return (
    <div>
      <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold">List of All Employees</h2>
      <table className="table table-striped table-bordered text-center mt-4">
        <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>NIC Number</th>
                
            </tr>
          
        </thead>
        <tbody>
        {employees.map((employee) => (
            <tr key={employee.id}>
              <th> {employee.id} </th>
              <td> {employee.firstName} </td>
              <td> {employee.lastName} </td>
              <td> {employee.email} </td>
              <td> {employee.nic} </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default AllEmployeeComponents
