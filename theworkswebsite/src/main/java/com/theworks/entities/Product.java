package com.theworks.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Table(name = "product", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@Entity
@Getter
@Setter
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int					id;
	private String				name;
	private String				description;
	private BigDecimal			cost;
	private BigDecimal			price;
	private String				size;
	private ArrayList<String>	types;
	private ArrayList<String>	colors;
	private ArrayList<String>	materials;
	@Lob
	@Column(columnDefinition = "BLOB")
	private byte[]				frontImage;
	@Lob
	@Column(columnDefinition = "BLOB")
	private byte[]				backImage;
	@Transient
	private byte[]				backImageMock;
	@Transient
	private byte[]				frontImageMock;
	@OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	private List<OtherImage>	otherImages;
}
