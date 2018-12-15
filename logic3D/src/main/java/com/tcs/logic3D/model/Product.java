package com.tcs.logic3D.model;

import java.util.List;

public class Product {
	List<ProductImage> productImage;
	String imagePointer;

	public Product() {
		super();
	}

	public Product(List<ProductImage> productImage, String imagePointer) {
		super();
		this.productImage = productImage;
		this.imagePointer = imagePointer;
	}

	public List<ProductImage> getProductImage() {
		return productImage;
	}

	public void setProductImage(List<ProductImage> productImage) {
		this.productImage = productImage;
	}

	public String getImagePointer() {
		return imagePointer;
	}

	public void setImagePointer(String imagePointer) {
		this.imagePointer = imagePointer;
	}

}
