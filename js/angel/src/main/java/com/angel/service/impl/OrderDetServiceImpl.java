package com.angel.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.OrderDetDto;
import com.angel.mapper.OrderDetMapper;
import com.angel.mo.OrderDet;
import com.angel.service.OrderDetService;

@Service("orderDetService")
public class OrderDetServiceImpl implements OrderDetService{

	 @Resource
     private OrderDetMapper  orderDetMapper;
     
     
	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<OrderDetDto> findOrderDetPg(OrderDetDto dto){
	
	  	Pagination<OrderDetDto> pg = new Pagination<OrderDetDto> ();
        int totalCount = this.orderDetMapper.countOrderDet(dto);

        dto.getPg ().setTotalCount (totalCount);
        dto.getPg ().calStart ();
        if(totalCount>0){
	        List<OrderDetDto> rstList =  this.orderDetMapper.findOrderDetList(dto);
	        BeanUtils.copyProperties (dto.getPg (),pg);	        
	        pg.setResultList (rstList);
        }else{
        	pg.setResultList(new ArrayList<OrderDetDto>());
        }
        pg.setTotalCount (totalCount);
        return pg;
	}
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<OrderDetDto> findOrderDetList(OrderDetDto dto){
		return this.orderDetMapper.findOrderDetList(dto);
	}
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public OrderDetDto getOrderDet(Long id){
	   OrderDetDto dto = new OrderDetDto();
		dto.setId(id);
		List<OrderDetDto> list = orderDetMapper.findOrderDetList(dto);
		if(list==null || list.size()==0){
			return null;
		}
	  	return list.get(0);
	}
	
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createOrderDet(OrderDet orderDet){
		orderDet.setDefalutValue();
		return orderDetMapper.insertOrderDet(orderDet);
	}
	
	/**
	 * 更新数据
	 * @param dto
	 * @return
	 */
	public int updateOrderDet(OrderDet orderDet) {
		return this.orderDetMapper.updateOrderDetByIds(orderDet);
	}
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteOrderDetByIds(List<Long> ids){
    	return this.orderDetMapper.deleteOrderDetByIds(ids);
    }
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteOrderDetById(Long id){
    	return this.orderDetMapper.deleteOrderDetById(id);
    }	
}