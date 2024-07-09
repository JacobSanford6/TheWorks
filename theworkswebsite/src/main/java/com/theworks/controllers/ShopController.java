package com.theworks.controllers;

import java.util.List;
import java.util.Optional;

import com.theworks.entities.Product;
import com.theworks.repos.ProductRepo;

import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import jakarta.servlet.ServletRequest;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@ViewScoped
@Named
public class ShopController {

	private Product selectedProduct = null;
	private List<Product> productList = null;

	public ShopController(ServletRequest request, ProductRepo productRepo) {

		Integer productId = null;
		if (request.getAttribute("productId") != null) {
			try {
				productId = Integer.parseInt((String) request.getAttribute("productId"));
			} catch (NumberFormatException e) {
			}
		}
		if (productId != null) {
			Optional<Product> foundProductOptional = productRepo.findById(productId);
			if (foundProductOptional.isPresent()) {
				this.selectedProduct = foundProductOptional.get();
			} else {
				productList = productRepo.findAllByListed(true);
			}
		} else {
			log.info("***loading clothing items");
			productList = productRepo.findAllByListed(true);
		}
		log.info("***id: " + productId);
	}
}
