package com.tcs.logic3D.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.logic3D.model.Product;
import com.tcs.logic3D.model.ProductImage;
import com.tcs.logic3D.repository.ImagePointerRepository;
import com.tcs.logic3D.repository.ProductImageRepository;

@RestController
public class ProductController {

	@Autowired
	ProductImageRepository productImageRepository;

	@Autowired
	ImagePointerRepository imagePointerRepository;

	@RequestMapping(value = "/getProduct/{productID}", method = RequestMethod.GET)
	public List<Product> getProduct(@PathVariable("productID") int productID) {
		List<Product> products=new ArrayList<>();
		List<ProductImage> productImages = productImageRepository.findByProductID(productID);
		for (ProductImage productImage : productImages) {
			products.add(new Product(productImage, imagePointerRepository.findByImageID(productImage.getImageID())));
		}
		return products;
	}
}
