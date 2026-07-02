package com.springjpa.implservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.springjpa.implservices.entity.Country;
import com.springjpa.implservices.services.serviceimpl.CountryServiceImpl;

@SpringBootApplication
public class ImplservicesApplication implements org.springframework.boot.CommandLineRunner {
    @Autowired
    private  CountryServiceImpl countryService;
    public static void main(String[] args) {
        SpringApplication.run(ImplservicesApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {

        Country newCountry = new Country();
        newCountry.setCoCode("CA");
        System.out.println("Updating country name...");
        newCountry.setCoName("Canada - Updated");
        countryService.updateCountry(newCountry);
        countryService.deleteCountry("CA");
    }
}
