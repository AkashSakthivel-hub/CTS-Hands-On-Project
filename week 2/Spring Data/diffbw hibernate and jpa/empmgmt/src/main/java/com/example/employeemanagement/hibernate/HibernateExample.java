package com.example.employeemanagement.hibernate;

import org.hibernate.*;
import org.hibernate.cfg.Configuration;

import com.example.employeemanagement.entity.Employee;

public class HibernateExample {

    public static Integer addEmployee(Employee employee) {
        Configuration configuration = new Configuration().configure()
            .addAnnotatedClass(Employee.class);

        SessionFactory factory = configuration.buildSessionFactory();
        Session session = factory.openSession();
        Transaction tx = null;
        Integer employeeId = null;

        try {
            tx = session.beginTransaction();
            session.persist(employee);
            employeeId = employee.getId();
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
            factory.close();
        }

        return employeeId;
    }
}
