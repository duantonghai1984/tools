package com.angel.mapper;

import java.util.List;
import com.angel.dto.OrderDetDto;
import com.angel.mo.OrderDet;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderDetMapper{
	
	
	/**
	 * 具体最大数量1万
	 * @param dto
	 * @return
	 */
	public List<OrderDet> findOrderDetList(OrderDetDto dto);
	

	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long insertOrderDet(OrderDet orderDet);
	
	
	
	/**
	 * 统计数目
	 * @param dto
	 * @return
	 */
	public int countOrderDet(OrderDetDto dto);
	
	/**
	 * 更新数据，只根据id或者ids更新
	 * @param dto
	 * @return
	 */
    public int updateOrderDetByIds(OrderDet orderDet);
    
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