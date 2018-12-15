package com.tcs.logic3D.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "image_pointer")
public class ImagePointer {

	@Id
	@Column(name = "product_id")
	int productID;

	@Column(name = "pointers")
	String pointers;

	public ImagePointer() {
	}

	public ImagePointer(int productID, String pointers) {
		super();
		this.productID = productID;
		this.pointers = pointers;
	}

	public int getProductID() {
		return productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public String getPointers() {
		return pointers;
	}

	public void setPointers(String pointers) {
		this.pointers = pointers;
	}

}
