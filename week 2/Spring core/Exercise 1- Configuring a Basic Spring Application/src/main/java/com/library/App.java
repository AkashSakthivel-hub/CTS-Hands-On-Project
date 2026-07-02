package com.library;

import com.library.repository.BookRepository;
import com.library.service.Bookservice;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class App 
{
    public static void main( String[] args )
    {
        ApplicationContext context = new ClassPathXmlApplicationContext("springconfig.xml");

       // BookRepository bookRepository = (BookRepository) context.getBean("bookRepositry");
        Bookservice bookservice =context.getBean(Bookservice.class) ;
        bookservice.list();
    }
}
