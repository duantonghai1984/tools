package com.angel.service;

import java.util.List;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.FoodDto;
import com.angel.mo.Food;

public interface FoodService{


	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<FoodDto> findFoodPg(FoodDto dto);
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<FoodDto> findFoodList(FoodDto dto);
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public FoodDto getFood(Long id);
	
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createFood(Food food);
	
	
	/**
	 * 修改数据
	 * @param dto
	 * @return
	 */
	public int updateFood(Food food);
	
	
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