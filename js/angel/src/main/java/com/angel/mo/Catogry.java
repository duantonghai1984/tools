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
	private Long  shopid;
	
	//  #不允许为空    
	private Integer  seq;
	
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
	
	private String  pName;
	
	public Long getShopid(){
		return this.shopid;
	}
		  
	public void setShopid(Long value){
		this.shopid=value;   
	}
	
	public Integer getSeq() {
		return seq;
	}

	public void setSeq(Integer seq) {
		this.seq = seq;
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

	public String getpName() {
		return pName;
	}

	public void setpName(String pName) {
		this.pName = pName;
	}
	


}