package com.angel.service;

import java.util.List;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.ShopDto;
import com.angel.mo.Shop;

public interface ShopService{


	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<ShopDto> findShopPg(ShopDto dto);
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<ShopDto> findShopList(ShopDto dto);
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public ShopDto getShop(Long id);
	
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createShop(Shop shop);
	
	
	/**
	 * 修改数据
	 * @param dto
	 * @return
	 */
	public int updateShop(Shop shop);
	
	
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