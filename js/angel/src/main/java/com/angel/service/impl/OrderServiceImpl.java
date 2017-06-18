package com.angel.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.OrderDto;
import com.angel.mapper.OrderDetMapper;
import com.angel.mapper.OrderMapper;
import com.angel.mo.Order;
import com.angel.mo.OrderDet;
import com.angel.service.OrderService;

@Service("orderService")
public class OrderServiceImpl implements OrderService{

	 @Resource
     private OrderMapper  orderMapper;
     
	 @Resource
     private OrderDetMapper  orderDetMapper;
	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<OrderDto> findOrderPg(OrderDto dto){
	
	  	Pagination<OrderDto> pg = new Pagination<OrderDto> ();
        int totalCount = this.orderMapper.countOrder(dto);

        dto.getPg ().setTotalCount (totalCount);
        dto.getPg ().calStart ();
        if(totalCount>0){
	        List<OrderDto> rstList =  this.orderMapper.findOrderList(dto);
	        BeanUtils.copyProperties (dto.getPg (),pg);	        
	        pg.setResultList (rstList);
        }else{
        	pg.setResultList(new ArrayList<OrderDto>());
        }
        pg.setTotalCount (totalCount);
        return pg;
	}
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<OrderDto> findOrderList(OrderDto dto){
		return this.orderMapper.findOrderList(dto);
	}
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public OrderDto getOrder(Long id){
	   OrderDto dto = new OrderDto();
		dto.setId(id);
		List<OrderDto> list = orderMapper.findOrderList(dto);
		if(list==null || list.size()==0){
			return null;
		}
	  	return list.get(0);
	}
	
	
	public Long createOrder(OrderDto order){
		order.setDefalutValue();
		Long orderId= orderMapper.insertOrder(order);
		for(OrderDet det:order.getOrderDet()){
			det.setOrderid(orderId.intValue());
			this.orderDetMapper.insertOrderDet(det);
		}
		
		return orderId;
	}
	
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createOrder(Order order){
		order.setDefalutValue();
		return orderMapper.insertOrder(order);
	}
	
	/**
	 * 更新数据
	 * @param dto
	 * @return
	 */
	public int updateOrder(Order order) {
		return this.orderMapper.updateOrderByIds(order);
	}
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteOrderByIds(List<Long> ids){
    	return this.orderMapper.deleteOrderByIds(ids);
    }
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteOrderById(Long id){
    	return this.orderMapper.deleteOrderById(id);
    }	
}