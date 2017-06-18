package com.angel.common;

import java.io.Serializable;
import java.util.Date;


/**
 * 基本MO
 **/
public class BaseMo implements Serializable {

	private static final long serialVersionUID = 1L;

	// ,不允许为空
	private Long id;

	// ,不允许为空
	private Date gmtCreated;

	// ,不允许为空
	private Date gmtModified;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getGmtCreated() {
		return gmtCreated;
	}

	public void setGmtCreated(Date gmtCreated) {
		this.gmtCreated = gmtCreated;
	}

	public Date getGmtModified() {
		return gmtModified;
	}

	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}

   public void setDefalutValue(){
	   
   }
	
}