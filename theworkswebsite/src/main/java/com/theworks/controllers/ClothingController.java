package com.theworks.controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.file.UploadedFile;
import org.primefaces.model.file.UploadedFiles;
import org.springframework.beans.factory.annotation.Autowired;

import com.theworks.entities.OtherImage;
import com.theworks.entities.Product;
import com.theworks.repos.OtherImageRepo;
import com.theworks.repos.ProductRepo;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named
@ViewScoped
public class ClothingController {
	private ProductRepo productRepo;
	private OtherImageRepo otherImageRepo;
	private String clothingName;
	private String clothingDescription;
	private String mode = "create";
	private Product selectedProduct;
	private UploadedFile frontImageUpload;
	private UploadedFile backImageUpload;
	private UploadedFiles otherImageUpload;

	@Autowired
	public ClothingController(ProductRepo productRepo, OtherImageRepo otherImageRepo) {
		this.productRepo = productRepo;
		this.otherImageRepo = otherImageRepo;
		this.selectedProduct = new Product();
	}

	@PostConstruct
	public void init() {

	}

	public void tryCreateProduct() {
		for (OtherImage otherImage : selectedProduct.getOtherImages()) {
			System.out.println("^^^: " + otherImage);
			otherImageRepo.save(otherImage);
		}
		productRepo.save(selectedProduct);
	}

	public void frontImageListener(FileUploadEvent event) {
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

	public void otherImagesListener(FileUploadEvent event) {
		UploadedFile file = event.getFile();
		List<OtherImage> otherImages = this.selectedProduct.getOtherImages();
		if (otherImages == null) {
			otherImages = new ArrayList<OtherImage>();
		}
		try {
			if (file != null && file.getSize() > 0) {
				OtherImage newImage = new OtherImage();
				File saveFileTest = new File("C:\\Users\\jake\\Downloads");
				// saveFileTest.set
				newImage.setImage(event.getFile().getContent());
				System.out.println(event.getFile().getContent());
				System.out.println(newImage.getImage());
				newImage.setImage(null);
				otherImages.add(newImage);
				selectedProduct.setOtherImages(otherImages);
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
