package com.theworks.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "product")
@Entity
@Getter
@Setter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private BigDecimal cost;
	private BigDecimal price;
	private ArrayList<String> types;
	private ArrayList<String> colors;
	private ArrayList<String> materials;
	@Lob
	@Column(columnDefinition = "BLOB")
	private byte[] frontImage;
	@Lob
	@Column(columnDefinition = "BLOB")
	private byte[] backImage;

	@OneToMany(mappedBy = "product")
	private List<OtherImage> otherImages;
}
