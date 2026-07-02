package com.springjpa.implservices.services.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springjpa.implservices.entity.Country;
import com.springjpa.implservices.repositories.CountryRepository;
import com.springjpa.implservices.services.CountryService;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Override
    @Transactional
    public Country getCountryByCode(String co_code) {
        return countryRepository.findById(co_code)
                .orElseThrow(() -> new RuntimeException("Country not found"));
    }

    @Override
    @Transactional
    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    @Transactional
    public Country updateCountry(Country country) {
        if (!countryRepository.existsById(country.getCoCode())) {
            throw new RuntimeException("Country not found");
        }
        return countryRepository.save(country);
    }

    @Override
    @Transactional
    public void deleteCountry(String code) {
        countryRepository.deleteById(code);
    }

    @Override
    @Transactional
    public List<Country> searchCountriesByName(String partialName) {
        return countryRepository.findByCoNameContainingIgnoreCase(partialName);
    }
}