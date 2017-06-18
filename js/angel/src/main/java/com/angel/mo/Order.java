package com.angel.mo;


import java.io.Serializable;
import java.util.Date;

import com.angel.common.BaseMo;

/**
    对应数据表  Order
**/
public class Order extends BaseMo implements Serializable{

	private static final long serialVersionUID = 1L;
	//  #不允许为空    
	private Integer  shopid;
	
	private String shopName;
	
	//  #不允许为空    
	private Integer  count;
	
	//  #不允许为空    
	private String  amount;
	
	//  #允许空
	private String  userPhone;
	
	//1 待处理  2已打印  3已传菜 4已结账  #不允许为空    
	private Integer  staus;
	
	//  #允许空
	private Date  gmtcreated;
	
	//  #允许空
	private Date  gmtmodified;
	
	private Integer deskid;
	
	public Integer getShopid(){
		return this.shopid;
	}
		  
	public void setShopid(Integer value){
		this.shopid=value;   
	}
	public Integer getCount(){
		return this.count;
	}
		  
	public void setCount(Integer value){
		this.count=value;   
	}
	public String getAmount(){
		return this.amount;
	}
		  
	public void setAmount(String value){
		this.amount=value;   
	}
	public String getUserPhone(){
		return this.userPhone;
	}
		  
	public void setUserPhone(String value){
		this.userPhone=value;   
	}
	public Integer getStaus(){
		return this.staus;
	}
		  
	public void setStaus(Integer value){
		this.staus=value;   
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

	public Integer getDeskid() {
		return deskid;
	}

	public void setDeskid(Integer deskid) {
		this.deskid = deskid;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	


}