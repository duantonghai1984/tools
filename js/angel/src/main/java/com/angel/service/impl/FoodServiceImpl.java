package com.angel.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.FoodDto;
import com.angel.mapper.FoodMapper;
import com.angel.mo.Food;
import com.angel.service.FoodService;

@Service("foodService")
public class FoodServiceImpl implements FoodService{

	 @Resource
     private FoodMapper  foodMapper;
     
     
	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<FoodDto> findFoodPg(FoodDto dto){
	
	  	Pagination<FoodDto> pg = new Pagination<FoodDto> ();
        int totalCount = this.foodMapper.countFood(dto);

        dto.getPg ().setTotalCount (totalCount);
        dto.getPg ().calStart ();
        if(totalCount>0){
	        List<FoodDto> rstList =  this.foodMapper.findFoodList(dto);
	        BeanUtils.copyProperties (dto.getPg (),pg);	        
	        pg.setResultList (rstList);
        }else{
        	pg.setResultList(new ArrayList<FoodDto>());
        }
        pg.setTotalCount (totalCount);
        return pg;
	}
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<FoodDto> findFoodList(FoodDto dto){
		return this.foodMapper.findFoodList(dto);
	}
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public FoodDto getFood(Long id){
	   FoodDto dto = new FoodDto();
		dto.setId(id);
		List<FoodDto> list = foodMapper.findFoodList(dto);
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
	public Long createFood(Food food){
		food.setDefalutValue();
		foodMapper.insertFood(food);
		return food.getId();
	}
	
	/**
	 * 更新数据
	 * @param dto
	 * @return
	 */
	public int updateFood(Food food) {
		return this.foodMapper.updateFoodByIds(food);
	}
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteFoodByIds(List<Long> ids){
    	return this.foodMapper.deleteFoodByIds(ids);
    }
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteFoodById(Long id){
    	return this.foodMapper.deleteFoodById(id);
    }	
}