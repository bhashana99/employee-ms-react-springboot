package com.example.emsbackend.controller;

import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.model.Employee;
import com.example.emsbackend.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepo employeeRepo;

    //Get All Employees Details API Request
    @GetMapping
    public List<Employee> getAllEmployees(){

        return employeeRepo.findAll();
    }

//    To Check Postman Get All Employee AIP
//    GET http://localhost:8080/api/v1/employees

    //    Add new Employee REST API
    @PostMapping
    public Employee createNewEmployee(@RequestBody Employee employee){

        return employeeRepo.save(employee);
    }
//    To Check Postman Add New Employee API
//    POST http://localhost:8080/api/v1/employees

    //Get Employee Details by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepo.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Employee Not exist with id :" + id));

        return ResponseEntity.ok(employee);
    }

    //    To Check Postman GET Employee Details By Id API
    //    GET http://localhost:8080/api/v1/employees/id

    //update employee details by using id Rest API
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employeeDetails){
        Employee employee = employeeRepo.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Employee Not exist with id :" + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setNic(employeeDetails.getNic());

        Employee updateEmployee =  employeeRepo.save(employee);

        return ResponseEntity.ok(updateEmployee);
    }

    //    To Check Postman update Employee Details By Id API
    //    PUT http://localhost:8080/api/v1/employees/id

    //delete employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
        Employee employee = employeeRepo.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Employee Not exist with id :" + id ));

        employeeRepo.delete(employee);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //    To Check Postman delete Employee Details By Id API
    //    DELETE http://localhost:8080/api/v1/employees/id
}
