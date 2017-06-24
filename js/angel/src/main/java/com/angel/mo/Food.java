package com.angel.mo;


import java.io.Serializable;
import java.util.Date;

import com.angel.common.BaseMo;

/**
    对应数据表  Food
**/
public class Food extends BaseMo implements Serializable{

	private static final long serialVersionUID = 1L;
	//  #允许空
	private Long  shopid;
	
	//  #允许空
	private Long  catogryid;
	
	//  #允许空
	private String  price;
	
	//  #允许空
	private String  des;
	
	//  #允许空
	private String  image;
	
	//  #允许空
	private Date  gmtcreated;
	
	//  #允许空
	private Date  gmtmodified;
	
	//  #允许空
	private String  name;
	
	
	
	public Long getShopid(){
		return this.shopid;
	}
		  
	public void setShopid(Long value){
		this.shopid=value;   
	}
	public Long getCatogryid(){
		return this.catogryid;
	}
		  
	public void setCatogryid(Long value){
		this.catogryid=value;   
	}
	public String getPrice(){
		return this.price;
	}
		  
	public void setPrice(String value){
		this.price=value;   
	}
	public String getDes(){
		return this.des;
	}
		  
	public void setDes(String value){
		this.des=value;   
	}
	public String getImage(){
		return this.image;
	}
		  
	public void setImage(String value){
		this.image=value;   
	}
	public Date getGmtcreated(){
		return this.gmtcreated;
	}
		  
	public void setGmtcreated(Date value){
		this.gmtcreated=value;   
	}
	public Date getGmtmodified(){
		return this.gmtmodified;
	}
		  
	public void setGmtmodified(Date value){
		this.gmtmodified=value;   
	}
	public String getName(){
		return this.name;
	}
		  
	public void setName(String value){
		this.name=value;   
	}
	


}