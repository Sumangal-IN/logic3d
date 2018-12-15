package com.tcs.logic3D.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcs.logic3D.model.ImagePointer;

@Repository
public interface ImagePointerRepository extends JpaRepository<ImagePointer, Integer> {
	public ImagePointer findByProductID(int productID);

}
