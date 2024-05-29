package com.theworks.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.file.UploadedFile;
import org.primefaces.model.file.UploadedFiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import com.theworks.entities.OtherImage;
import com.theworks.entities.Product;
import com.theworks.repos.OtherImageRepo;
import com.theworks.repos.ProductRepo;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@Named
@ViewScoped
public class ClothingController extends BaseController {

	private static final long serialVersionUID = 1L;
	private ProductRepo productRepo;
	private OtherImageRepo otherImageRepo;
	private String clothingName;
	private String clothingDescription;
	private String mode = "list";
	private Product selectedProduct;
	private UploadedFile frontImageUpload;
	private UploadedFile backImageUpload;
	private UploadedFiles otherImageUpload;
	private ArrayList<Product> productList;
	private byte[] testByteArr;

	@Autowired
	public ClothingController(ProductRepo productRepo, OtherImageRepo otherImageRepo) {
		this.productRepo = productRepo;
		this.otherImageRepo = otherImageRepo;
		this.selectedProduct = new Product();
		this.productList = new ArrayList<>();
	}

	@PostConstruct
	public void init() {
		updateProductList();
		System.out.println("new");
	}

	private void updateProductList() {
		productList = new ArrayList<>();
		for (Product product : productRepo.findAll()) {
			testByteArr = product.getFrontImage();
			productList.add(product);
		}
	}

	public void tryCreateProduct() {
		if (selectedProduct.getOtherImages() != null && selectedProduct.getOtherImages().isEmpty()) {
			Product oldProduct = productRepo.findById(selectedProduct.getId()).get();
			log.info("Old Product Length... " + Integer.toString(oldProduct.getOtherImages().size()));
			for (OtherImage otherImage : oldProduct.getOtherImages()) {
				otherImageRepo.delete(otherImage);
			}
			selectedProduct.setOtherImages(new ArrayList<>());
		}

		if (otherImageUpload != null && otherImageUpload.getFiles() != null) {
			for (UploadedFile uploadedFile : otherImageUpload.getFiles()) {
				OtherImage otherImage = new OtherImage();
				otherImage.setImage(uploadedFile.getContent());
				otherImage.setProduct(selectedProduct);
				List<OtherImage> otherImages;

				if (selectedProduct.getOtherImages() != null) {
					otherImages = selectedProduct.getOtherImages();
				} else {
					otherImages = new ArrayList<>();
				}

				otherImages.add(otherImage);
				selectedProduct.setOtherImages(otherImages);
			}
		}
		if (frontImageUpload != null) {
			try {
				log.info(frontImageUpload.getInputStream().readAllBytes().toString());
				selectedProduct.setFrontImage(frontImageUpload.getInputStream().readAllBytes());
			} catch (Exception e) {
				log.error("Front image error", e);
			}
		}
		if (backImageUpload != null) {
			selectedProduct.setBackImage(backImageUpload.getContent());
		}

		try {
			Product savedProduct = productRepo.save(selectedProduct);
			if (productRepo.existsById(savedProduct.getId())) {
				if (selectedProduct.getOtherImages() != null) {
					for (OtherImage otherImage : selectedProduct.getOtherImages()) {
						otherImage.setProduct(savedProduct);
						otherImageRepo.save(otherImage);
					}
				}

				selectedProduct = null;
				updateProductList();
				mode = "list";
			}
		} catch (DataIntegrityViolationException e) {
			if (e.getMessage().contains("Duplicate entry")) {
				addError("This product alread exists!");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void removeFrontImage() {
		try {
			if (frontImageUpload != null) {
				frontImageUpload.delete();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		selectedProduct.setFrontImage(null);
	}

	public void removeBackImage() {
		try {
			if (frontImageUpload != null) {
				backImageUpload.delete();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		selectedProduct.setBackImage(null);
	}

	public void removeOtherImages() {
		otherImageUpload = null;
		List<OtherImage> otherImages = selectedProduct.getOtherImages();
		otherImages.clear();
		selectedProduct.setOtherImages(otherImages);
	}

	public void goToCreate() {
		this.mode = "create";
		System.out.println("creating");
		selectedProduct = new Product();
	}

	public void goToEdit(int id) {
		Product searchProduct = productRepo.findById(id).get();
		System.out.println(searchProduct.getOtherImages().size());
		if (searchProduct != null) {
			selectedProduct = searchProduct;
			mode = "edit";
		}
	}

	public void goToList() {
		updateProductList();
		selectedProduct = null;
		mode = "list";
	}

	public void frontImageListener(FileUploadEvent event) {
		log.info("*** file upload front");
		UploadedFile file = event.getFile();
		try {
			if (file != null && file.getSize() > 0) {
				this.selectedProduct.setFrontImage(event.getFile().getContent());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void backImageListener(FileUploadEvent event) {
		UploadedFile file = event.getFile();
		try {
			if (file != null && file.getSize() > 0) {
				this.selectedProduct.setBackImage(event.getFile().getContent());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void formSubmit() {
		System.out.println();
	}

	public void testListener(FileUploadEvent event) {
		System.out.println(event.getFile().getFileName());
	}
}
