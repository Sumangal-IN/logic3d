package com.tcs.logic3D.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcs.logic3D.model.ProductImage;
import com.tcs.logic3D.model.ProductImageKey;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, ProductImageKey> {
	public List<ProductImage> findByProductID(int productID);
	
}
