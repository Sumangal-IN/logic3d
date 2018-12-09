package com.tcs.logic3D.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcs.logic3D.model.ImagePointer;
import com.tcs.logic3D.model.ImagePointerKey;

@Repository
public interface ImagePointerRepository extends JpaRepository<ImagePointer, ImagePointerKey> {
	public List<ImagePointer> findByImageID(int imageID);

}
