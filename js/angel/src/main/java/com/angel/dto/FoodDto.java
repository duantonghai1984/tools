package com.angel.dto;

import java.util.List;

import com.angel.common.mybatis.BaseDto;
import com.angel.common.mybatis.PgDto;
import com.angel.mo.Food;



/**
    对应数据表  Food 的数据库操作接口
**/

public class FoodDto extends Food implements PgDto{

private static final long serialVersionUID = 1L;


   private BaseDto pg = new BaseDto();

	
	public BaseDto getPg() {
		if (pg == null) {
			pg = new BaseDto();
		}
		return pg;
	}
	
    private List<Long> ids;
   
    public List <Long> getIds (){
        return ids;
    }

   public void setIds (List <Long> ids){
        this.ids = ids;
    }
    
    public void setLimit(int limit){
    	this.getPg().setLimit(limit);
	}

	public void setStart(int start){
  			 this.getPg().setStart(start);
	}
	
	//点菜数量
	private int count=0;


	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
	private String pName;


	public String getpName() {
		return pName;
	}

	public void setpName(String pName) {
		this.pName = pName;
	}


	
	
	
   
}