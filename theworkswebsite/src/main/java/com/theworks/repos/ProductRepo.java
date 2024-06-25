package com.theworks.repos;

import com.theworks.entities.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
	
	List<Product> findAllByListed(boolean listed);
}
