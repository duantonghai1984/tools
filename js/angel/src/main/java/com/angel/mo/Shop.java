package com.angel.mo;


import java.io.Serializable;
import java.util.Date;

import com.angel.common.BaseMo;

/**
    对应数据表  Shop
**/
public class Shop extends BaseMo implements Serializable{

	private static final long serialVersionUID = 1L;
	//  #不允许为空    
	private String  name;
	
	//  #不允许为空    
	private String  pwd;
	
	//  #不允许为空    
	private String  phone;
	
	//  #不允许为空    
	private String  address;
	
	//  #允许空
	private Date  gmtcreated;
	
	//  #允许空
	private Date  gmtmodified;
	
	private String shopName;
	
	public String getName(){
		return this.name;
	}
		  
	public void setName(String value){
		this.name=value;   
	}
	public String getPwd(){
		return this.pwd;
	}
		  
	public void setPwd(String value){
		this.pwd=value;   
	}
	public String getPhone(){
		return this.phone;
	}
		  
	public void setPhone(String value){
		this.phone=value;   
	}
	public String getAddress(){
		return this.address;
	}
		  
	public void setAddress(String value){
		this.address=value;   
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

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	


}