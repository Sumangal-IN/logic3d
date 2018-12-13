package com.tcs.logic3D.util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImageProcessor {
	private static final int IMG_WIDTH = 100;
	private static final int IMG_HEIGHT = 100;

	public String resizeImage(MultipartFile photoFile) throws IOException {
		String imageAfterResize = null;
		if (null != photoFile && !photoFile.isEmpty()) {
			byte[] bytes = photoFile.getBytes();
			imageAfterResize = resizeImage(bytes);
		}
		return imageAfterResize;
	}

	public String resizeImage(byte[] image) throws IOException {
		return resizeImage(image, IMG_HEIGHT, IMG_WIDTH);
	}

	public String resizeImage(byte[] image, int height, int width) throws IOException {
		String imageAfterResize = null;
		if (image.length > 0) {
			BufferedImage originalImage = ImageIO.read(new ByteArrayInputStream(image));
			int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
			BufferedImage resizedImage = new BufferedImage((int) ((width / 100d) * originalImage.getWidth()), (int) ((height / 100d) * originalImage.getHeight()), type);
			Graphics2D g = resizedImage.createGraphics();
			g.drawImage(originalImage, 0, 0, (int) ((width / 100d) * originalImage.getWidth()), (int) ((height / 100d) * originalImage.getHeight()), null);
			g.dispose();
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			ImageIO.write(resizedImage, "jpg", bos);
			imageAfterResize = Base64Utils.encodeToString(bos.toByteArray());
		}
		return imageAfterResize;
	}
}