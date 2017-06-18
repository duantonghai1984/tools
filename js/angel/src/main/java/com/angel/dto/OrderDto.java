package com.angel.dto;

import java.util.List;

import com.angel.common.mybatis.BaseDto;
import com.angel.common.mybatis.PgDto;
import com.angel.mo.Order;
import com.angel.mo.OrderDet;



/**
    对应数据表  Order 的数据库操作接口
**/

public class OrderDto extends Order implements PgDto{

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
   
	private List<OrderDet> orderDet;


	public List<OrderDet> getOrderDet() {
		return orderDet;
	}


	public void setOrderDet(List<OrderDet> orderDet) {
		this.orderDet = orderDet;
	}
	
	
	
}