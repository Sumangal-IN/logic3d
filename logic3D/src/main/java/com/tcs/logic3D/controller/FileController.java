package com.tcs.logic3D.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tcs.logic3D.repository.ProductImageRepository;
import com.tcs.logic3D.util.ImageProcessor;

@RestController
public class FileController {

	@Autowired
	ImageProcessor imageProcessor;

	@Autowired
	ProductImageRepository productImageRepository;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void uploadFiles(@RequestParam("uploadedFiles") MultipartFile[] uploadedFiles) throws IOException {
		for (MultipartFile f : uploadedFiles) {
			System.out.println(imageProcessor.resizeImage(f.getBytes()));
		}
	}

}
