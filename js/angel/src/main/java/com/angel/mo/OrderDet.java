package com.angel.mo;


import java.io.Serializable;
import java.util.Date;

import com.angel.common.BaseMo;

/**
    对应数据表  OrderDet
**/
public class OrderDet extends BaseMo implements Serializable{

	private static final long serialVersionUID = 1L;
	//  #不允许为空    
	private Long  orderid;
	
	//  #不允许为空    
	private Long  foodid;
	
	//  #不允许为空    
	private String  foodname;
	
	//  #不允许为空    
	private Integer  count;
	
	//  #不允许为空    
	private String  price;
	
	//  #允许空
	private String  des;
	
	//  #允许空
	private Date  gmtcreated;
	
	//  #允许空
	private Date  gmtmodified;
	
	public Long getOrderid(){
		return this.orderid;
	}
		  
	public void setOrderid(Long value){
		this.orderid=value;   
	}
	public Long getFoodid(){
		return this.foodid;
	}
		  
	public void setFoodid(Long value){
		this.foodid=value;   
	}
	public String getFoodname(){
		return this.foodname;
	}
		  
	public void setFoodname(String value){
		this.foodname=value;   
	}
	public Integer getCount(){
		return this.count;
	}
		  
	public void setCount(Integer value){
		this.count=value;   
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
	


}