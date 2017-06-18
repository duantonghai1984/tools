package com.angel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.angel.dto.OrderDto;
import com.angel.mo.Order;

@Mapper
public interface OrderMapper{
	
	
	/**
	 * 具体最大数量1万
	 * @param dto
	 * @return
	 */
	public List<OrderDto> findOrderList(OrderDto dto);
	

	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long insertOrder(Order order);
	
	
	
	/**
	 * 统计数目
	 * @param dto
	 * @return
	 */
	public int countOrder(OrderDto dto);
	
	/**
	 * 更新数据，只根据id或者ids更新
	 * @param dto
	 * @return
	 */
    public int updateOrderByIds(Order order);
    
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