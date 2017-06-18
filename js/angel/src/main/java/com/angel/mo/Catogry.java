package com.angel.mo;


import java.io.Serializable;
import java.util.Date;

import com.angel.common.BaseMo;

/**
    对应数据表  Catogry
**/
public class Catogry extends BaseMo implements Serializable{

	private static final long serialVersionUID = 1L;
	//  #不允许为空    
	private Integer  shopid;
	
	//  #不允许为空    
	private Integer  order;
	
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
	
	public Integer getShopid(){
		return this.shopid;
	}
		  
	public void setShopid(Integer value){
		this.shopid=value;   
	}
	public Integer getOrder(){
		return this.order;
	}
		  
	public void setOrder(Integer value){
		this.order=value;   
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