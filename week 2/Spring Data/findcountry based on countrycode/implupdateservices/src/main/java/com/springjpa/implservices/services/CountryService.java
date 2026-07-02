package com.springjpa.implservices.services;

import com.springjpa.implservices.entity.Country;

import java.util.List;


public interface CountryService {
    Country getCountryByCode(String code);
    Country addCountry(Country country);
    Country updateCountry(Country country);
    void deleteCountry(String code);
    List<Country> searchCountriesByName(String partialName);
}

