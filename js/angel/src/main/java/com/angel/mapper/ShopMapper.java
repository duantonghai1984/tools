package com.angel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.angel.dto.ShopDto;
import com.angel.mo.Shop;

@Mapper
public interface ShopMapper{
	
	
	/**
	 * 具体最大数量1万
	 * @param dto
	 * @return
	 */
	public List<ShopDto> findShopList(ShopDto dto);
	

	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long insertShop(Shop shop);
	
	
	
	/**
	 * 统计数目
	 * @param dto
	 * @return
	 */
	public int countShop(ShopDto dto);
	
	/**
	 * 更新数据，只根据id或者ids更新
	 * @param dto
	 * @return
	 */
    public int updateShopByIds(Shop shop);
    
    /**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteShopByIds(List<Long> ids); 
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteShopById(Long id); 
}