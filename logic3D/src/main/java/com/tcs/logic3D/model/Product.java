package com.tcs.logic3D.model;

import java.util.List;

public class Product {
	ProductImage productImage;
	List<ImagePointer> imagePointer;

	public Product() {
		super();
	}

	public Product(ProductImage productImage, List<ImagePointer> imagePointer) {
		super();
		this.productImage = productImage;
		this.imagePointer = imagePointer;
	}

	public ProductImage getProductImage() {
		return productImage;
	}

	public void setProductImage(ProductImage productImage) {
		this.productImage = productImage;
	}

	public List<ImagePointer> getImagePointer() {
		return imagePointer;
	}

	public void setImagePointer(List<ImagePointer> imagePointer) {
		this.imagePointer = imagePointer;
	}

}
