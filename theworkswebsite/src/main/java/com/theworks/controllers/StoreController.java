package com.theworks.controllers;

import com.theworks.entities.Product;
import com.theworks.repos.ProductRepo;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@ViewScoped
@Named
public class StoreController {
	
	private Product selectedProduct = new Product();
	
	public StoreController(	ServletContext servletContext,
							HttpSession session,
							ProductRepo productRepo) {
		Integer productId = null;
		try {
			productId = Integer.parseInt((String) session.getAttribute("productId"));
		} catch (NumberFormatException e) {
		}
		if (productId != null) {
			Optional<Product> foundProductOptional = productRepo.findById(productId);
			if (foundProductOptional.isPresent()) {
				this.selectedProduct = foundProductOptional.get();
			}
		}
	}
}
