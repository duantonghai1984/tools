package com.angel.service;

import java.util.List;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.OrderDetDto;
import com.angel.mo.OrderDet;

public interface OrderDetService{


	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<OrderDetDto> findOrderDetPg(OrderDetDto dto);
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<OrderDetDto> findOrderDetList(OrderDetDto dto);
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public OrderDetDto getOrderDet(Long id);
	
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createOrderDet(OrderDet orderDet);
	
	
	/**
	 * 修改数据
	 * @param dto
	 * @return
	 */
	public int updateOrderDet(OrderDet orderDet);
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteOrderDetByIds(List<Long> ids); 
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteOrderDetById(Long id); 
	
	
}