package com.theworks.entities;

import java.math.BigDecimal;
import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "product")
@Entity
@Getter
@Setter
public class Product {
	private String name;
	private String description;
	private BigDecimal cost;
	private BigDecimal price;
	private ArrayList<String> types;
	private ArrayList<String> colors;
	private ArrayList<String> materials;
}
