package com.angel.service;

import java.util.List;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.OrderDto;
import com.angel.mo.Order;

public interface OrderService{


	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<OrderDto> findOrderPg(OrderDto dto);
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<OrderDto> findOrderList(OrderDto dto);
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public OrderDto getOrder(Long id);
	
	
	public Long createOrder(OrderDto order);
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createOrder(Order order);
	
	
	/**
	 * 修改数据
	 * @param dto
	 * @return
	 */
	public int updateOrder(Order order);
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteOrderByIds(List<Long> ids); 
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteOrderById(Long id); 
	
	
}