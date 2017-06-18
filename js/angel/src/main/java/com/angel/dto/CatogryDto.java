package com.angel.dto;

import com.angel.common.mybatis.BaseDto;
import com.angel.common.mybatis.PgDto;
import com.angel.mo.Catogry;



/**
    对应数据表  Catogry 的数据库操作接口
**/

public class CatogryDto extends Catogry implements PgDto{

private static final long serialVersionUID = 1L;


	private BaseDto pg = new BaseDto();

	
	public BaseDto getPg() {
		if (pg == null) {
			pg = new BaseDto();
		}
		return pg;
	}	

    
	public void setLimit(int limit){
		this.getPg().setLimit(limit);
	}

	public void setStart(int start){
		this.getPg().setStart(start);
	}
   
}