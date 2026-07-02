package com.example.employeemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.hibernate.HibernateExample;
import com.example.employeemanagement.service.EmployeeService;

@SpringBootApplication
public class EmpmgmtApplication {
	
	@Autowired
	private EmployeeService employeeService;

	public static void main(String[] args) {
		SpringApplication.run(EmpmgmtApplication.class, args);
	}
	
    public void run(String... args) {
        // Using Spring Data JPA
        Employee emp1 = new Employee();
        emp1.setName("Alice");
        emp1.setRole("Developer");
        employeeService.addEmployee(emp1);

        // Using Raw Hibernate
        Employee emp2 = new Employee();
        emp2.setName("Bob");
        emp2.setRole("Manager");
        Integer id = HibernateExample.addEmployee(emp2);
        System.out.println("Hibernate saved employee with ID: " + id);
    }
}
