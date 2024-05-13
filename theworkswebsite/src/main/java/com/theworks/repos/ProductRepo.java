package com.theworks.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.theworks.entities.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

}
