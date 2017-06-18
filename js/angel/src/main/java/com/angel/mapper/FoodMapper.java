package com.angel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.angel.dto.FoodDto;
import com.angel.mo.Food;

@Mapper
public interface FoodMapper{
	
	
	/**
	 * 具体最大数量1万
	 * @param dto
	 * @return
	 */
	public List<FoodDto> findFoodList(FoodDto dto);
	

	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long insertFood(Food food);
	
	
	
	/**
	 * 统计数目
	 * @param dto
	 * @return
	 */
	public int countFood(FoodDto dto);
	
	/**
	 * 更新数据，只根据id或者ids更新
	 * @param dto
	 * @return
	 */
    public int updateFoodByIds(Food food);
    
    /**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteFoodByIds(List<Long> ids); 
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteFoodById(Long id); 
}