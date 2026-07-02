package com.springjpa.implservices.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springjpa.implservices.entity.Country;


@Repository
public interface CountryRepository extends JpaRepository<Country,String>{
    List<Country> findByCoNameContainingIgnoreCase(String namePart);
}
