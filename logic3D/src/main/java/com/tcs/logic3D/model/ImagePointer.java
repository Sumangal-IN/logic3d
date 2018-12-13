package com.tcs.logic3D.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "image_pointer")
public class ImagePointer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;

	@Column(name = "image_id")
	int imageID;

	@Column(name = "pointer_id")
	int pointerID;

	@Column(name = "short_description")
	String shortDesciption;

	@Column(name = "long_description")
	String longDesciption;

	@Column(name = "x_value")
	double xValue;

	@Column(name = "y_value")
	double yValue;

	public ImagePointer() {
		super();
	}

	public ImagePointer(int imageID, int pointerID, String shortDesciption, String longDesciption, double xValue, double yValue) {
		super();
		this.imageID = imageID;
		this.pointerID = pointerID;
		this.shortDesciption = shortDesciption;
		this.longDesciption = longDesciption;
		this.xValue = xValue;
		this.yValue = yValue;
	}

	public int getImageID() {
		return imageID;
	}

	public void setImageID(int imageID) {
		this.imageID = imageID;
	}

	public int getPointerID() {
		return pointerID;
	}

	public void setPointerID(int pointerID) {
		this.pointerID = pointerID;
	}

	public String getShortDesciption() {
		return shortDesciption;
	}

	public void setShortDesciption(String shortDesciption) {
		this.shortDesciption = shortDesciption;
	}

	public String getLongDesciption() {
		return longDesciption;
	}

	public void setLongDesciption(String longDesciption) {
		this.longDesciption = longDesciption;
	}

	public double getxValue() {
		return xValue;
	}

	public void setxValue(double xValue) {
		this.xValue = xValue;
	}

	public double getyValue() {
		return yValue;
	}

	public void setyValue(double yValue) {
		this.yValue = yValue;
	}

}
