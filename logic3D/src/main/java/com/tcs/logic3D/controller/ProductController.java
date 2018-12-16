package com.tcs.logic3D.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.logic3D.model.ImagePointer;
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
	public Product getProduct(@PathVariable("productID") int productID) {
		List<ProductImage> productImages = productImageRepository.findByProductIDOrderByAngle(productID);
		ImagePointer imagePointer = imagePointerRepository.findByProductID(productID);
		String pointers = (imagePointer == null ? null : imagePointer.getPointers());
		return new Product(productImages, pointers);
	}

	@RequestMapping(value = "/saveImagePointers/{productID}", method = RequestMethod.POST)
	public void saveProduct(@PathVariable("productID") int productID, @RequestBody String pointers) {
		imagePointerRepository.save(new ImagePointer(productID, pointers));
	}

}
