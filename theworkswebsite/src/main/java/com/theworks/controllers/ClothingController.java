package com.theworks.controllers;

import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named
@ViewScoped
public class ClothingController {
	private String clothingName;
	private String clothingDescription;
}
