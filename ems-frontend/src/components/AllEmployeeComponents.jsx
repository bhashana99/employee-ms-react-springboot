import React from 'react'
import { useState} from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import EmployeeService from '../service/EmployeeService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

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

      const deleteEmployee = (employeeId) => {
        // console.log(employeeId);
        EmployeeService.deleteEmployeeById(employeeId).then((response) =>{
          getAllEmployees();

          Toast.fire({
            icon: 'success',
            iconColor:'red',
            title: 'Employee Deleting successful'
          });
        }).catch((error) => {
          console.log(error);
        })
      }

  return (
    <div>
      <div className="container mt-5 ">
      <h2 className="text-center text-primary shadow my-5 py-3">List of All Employees</h2>
      <Link to='/add-employee' className='btn btn-success shadow-lg' >Add New Employee</Link>
      <table className="table table-striped table-bordered text-center mt-4 shadow-lg">
        <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>NIC Number</th>
                <th>Action</th>
                
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
              <td>
                <Link to={`/edit-employee/${employee.id}`} className='btn btn-warning shadow-lg' >Update</Link>
                <button className='btn btn-danger' onClick = {() => deleteEmployee(employee.id)} style={{marginLeft:"10px"}} >Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default AllEmployeeComponents
