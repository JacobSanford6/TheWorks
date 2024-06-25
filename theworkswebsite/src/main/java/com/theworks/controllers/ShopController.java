package com.theworks.controllers;

import com.theworks.entities.Product;
import com.theworks.repos.ProductRepo;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import jakarta.servlet.ServletRequest;
import java.util.List;
import java.util.Optional;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@ViewScoped
@Named
public class ShopController {
	
	private Product			selectedProduct	= null;
	private List<Product>	productList		= null;
	
	public ShopController(	ServletRequest request,
							ProductRepo productRepo) {
		Integer productId = null;
		try {
			productId = Integer.parseInt((String) request.getAttribute("productId"));
		} catch (NumberFormatException e) {
		}
		if (productId != null) {
			Optional<Product> foundProductOptional = productRepo.findById(productId);
			if (foundProductOptional.isPresent()) {
				this.selectedProduct = foundProductOptional.get();
			} else {
				productList = productRepo.findAllByListed(true);
			}
		} else {
			productList = productRepo.findAllByListed(true);
		}
	}
}
