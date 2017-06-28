package com.angel.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.CropImageFilter;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;

/**
 * a tool class for image process
 *
 */
public class ImageUtil {

	/**
	 * scale image to given width and height
	 * @param file   the image input file
	 * @param width  scale width
	 * @param height scale height
	 * @return  scaled image as an Image Object
	 * @throws IOException
	 */
	public static Image scaleImage(File file,int width,int height) throws IOException{
		Image image=ImageIO.read(file);
		return image.getScaledInstance(width, height, Image.SCALE_DEFAULT);
	}
	
	/**
	 * scale image to given width and height
	 * @param width  scale width
	 * @param height scale height
	 * @return  scaled image as an Image Object
	 * @throws IOException
	 */
	public static Image scaleImage(ImageInputStream stream,int width,int height) throws IOException{
		Image image=ImageIO.read(stream);
		return image.getScaledInstance(width, height, Image.SCALE_DEFAULT);
	}
	
	/**
	 * scale image to given width and height
	 * @param width  scale width
	 * @param height scale height
	 * @return  scaled image as an Image Object
	 * @throws IOException
	 */
	public static Image scaleImage(InputStream input,int width,int height) throws IOException{
		Image image=ImageIO.read(input);
		return image.getScaledInstance(width, height, Image.SCALE_DEFAULT);
	}
	
	/**
	 * scale image to given width and height
	 * @param width  scale width
	 * @param height scale height
	 * @return  scaled image as an Image Object
	 * @throws IOException
	 */
	public static Image scaleImage(URL url,int width,int height) throws IOException{
		Image image=ImageIO.read(url);
		return image.getScaledInstance(width, height, Image.SCALE_DEFAULT);
	}
	
	/**
	 * create a image file according to the given image object and given image type
	 * @param bi  a BufferedImage object which would be deal with
	 * @param out  the image output stream
	 * @param formatName  image type
	 * @throws IOException 
	 */
	public static void createImageFile(BufferedImage bi,String formatName, OutputStream out) throws IOException{
		ImageIO.write(bi, formatName, out);
	}
	
	/**
	 * create a image file according to the given image object and given image type
	 * @param image  the image object which would be deal with
	 * @param out  the image output stream
	 * @param formatName  image type
	 * @throws IOException 
	 */
	public static void createImageFile(Image image,String formatName, OutputStream out) throws IOException{
		BufferedImage bi=new BufferedImage(image.getWidth(null), image.getHeight(null),BufferedImage.TYPE_INT_RGB);
		Graphics2D g2 = (Graphics2D) bi.getGraphics();
        g2.drawImage(image, 0, 0, null);
        g2.dispose();
        bi.flush();
		ImageIO.write(bi, formatName, out);
	}
	
	/**
	 * crop a given image
	 * @param sourceImage   source image object
	 * @param x    the x location of the top of the rectangle to be extracted
	 * @param y    the y location of the top of the rectangle to be extracted
	 * @param width   the width of the rectangle to be extracted
	 * @param height  the height of the rectangle to be extracted
	 * @return  a image object which has been deal with
	 */
	public static Image cropImage(Image sourceImage,int x,int y,int width,int height){
		java.awt.Image croppedImage;
		ImageFilter cropFilter;
		cropFilter =new CropImageFilter(x,y,width,height);
		croppedImage= Toolkit.getDefaultToolkit().createImage(new FilteredImageSource(sourceImage.getSource(),cropFilter));
		return croppedImage;
	}
	
	/**
	 * crop a image picture to given size and out put to a stream
	 * @param inputImageFile  the image input stream
	 * @param x    the x location of the top of the rectangle to be extracted
	 * @param y    the y location of the top of the rectangle to be extracted
	 * @param width   the width of the rectangle to be extracted
	 * @param height  the height of the rectangle to be extracted
	 * @param out     dealed image out put stream
	 * @param formatName  image type 
	 * @throws IOException 
	 */
	public static void cropImage(InputStream inputImageFile,int x,int y,int width,int height,OutputStream out,String formatName) throws IOException{
		BufferedImage sourceImage=ImageIO.read(inputImageFile);
		Image croppedImage=cropImage(sourceImage,x,y,width,height);
        if(formatName!=null){
        	createImageFile(croppedImage, formatName, out);
        }else{
        	createImageFile(croppedImage, "jpg", out);
        }	
	}
	
	/**
	 * test wheater the given pictures width is longer than his height
	 * @param imageFilePath   image file full path
	 * @return  if width>height return 1, else if width<height return -1, others return 0;
	 */
	public static int comParePictureWidthAndHeight(String imageFilePath){
		try {
			java.awt.Image image=ImageIO.read(new File(imageFilePath));
			int width=image.getWidth(null);
			int height=image.getHeight(null);
			if(width>height){
				return 1;
			}else if(width<height){
				return  -1;
			}else{
				return 0;
			}
		} catch (IOException e) {
			return 0;
		}
	}
}
