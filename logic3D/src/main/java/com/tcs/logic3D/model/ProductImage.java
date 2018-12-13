package com.tcs.logic3D.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_image")
public class ProductImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;

	@Column(name = "product_id")
	int productID;

	@Column(name = "image_id")
	int imageID;

	@Column(name = "angle")
	int angle;

	@Column(name = "image_file")
	String imageFile;

	public ProductImage() {
		super();
	}

	public ProductImage(int productID, int imageID, int angle, String image_file) {
		super();
		this.productID = productID;
		this.imageID = imageID;
		this.angle = angle;
		this.imageFile = image_file;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProductID() {
		return productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public int getImageID() {
		return imageID;
	}

	public void setImageID(int imageID) {
		this.imageID = imageID;
	}

	public int getAngle() {
		return angle;
	}

	public void setAngle(int angle) {
		this.angle = angle;
	}

	public String getImageFile() {
		return imageFile;
	}

	public void setImageFile(String imageFile) {
		this.imageFile = imageFile;
	}

}
