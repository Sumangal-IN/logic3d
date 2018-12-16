package com.tcs.logic3D.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tcs.logic3D.model.ProductImage;
import com.tcs.logic3D.repository.ProductImageRepository;
import com.tcs.logic3D.util.ImageProcessor;

@RestController
public class FileController {

	@Autowired
	ImageProcessor imageProcessor;

	@Autowired
	ProductImageRepository productImageRepository;

	@RequestMapping(value = "/upload/{productID}", method = RequestMethod.POST)
	public void uploadFiles(@RequestParam("files") MultipartFile[] files, @PathVariable("productID") int productID) throws IOException {
		int imageID = 0;
		for (MultipartFile f : files) {
			System.out.println("Processing file: " + f.getOriginalFilename());
			int angle = Integer.parseInt(f.getOriginalFilename().split("\\.")[0].split("_")[2]);
			System.out.println("product ID: " + productID + " image ID: " + imageID + " angle: " + angle);

			ProductImage productImage = new ProductImage(productID, imageID++, angle, imageProcessor.resizeImage(f.getBytes()));
			productImageRepository.save(productImage);
		}
	}

	@RequestMapping(value = "/upload/{productID}/{width}/{height}", method = RequestMethod.POST)
	public void uploadFilesWithResize(@RequestParam("file") MultipartFile[] files, @PathVariable("productID") int productID, @PathVariable("width") int width, @PathVariable("height") int height) throws IOException {
		int imageID = 0;
		for (MultipartFile f : files) {
			System.out.println("Processing file: " + f.getOriginalFilename());
			int angle = Integer.parseInt(f.getOriginalFilename().split("\\.")[0].split("_")[2]);
			System.out.println("product ID: " + productID + " image ID: " + imageID + " angle: " + angle);

			ProductImage productImage = new ProductImage(productID, imageID++, angle, imageProcessor.resizeImage(f.getBytes(), height, width));
			productImageRepository.save(productImage);
		}
	}

}
