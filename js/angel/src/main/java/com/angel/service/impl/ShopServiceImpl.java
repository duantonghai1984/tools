package com.angel.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.ShopDto;
import com.angel.mapper.ShopMapper;
import com.angel.mo.Shop;
import com.angel.service.ShopService;

@Service("shopService")
public class ShopServiceImpl implements ShopService{

	 @Resource
     private ShopMapper  shopMapper;
     
     
	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<ShopDto> findShopPg(ShopDto dto){
	
	  	Pagination<ShopDto> pg = new Pagination<ShopDto> ();
        int totalCount = this.shopMapper.countShop(dto);

        dto.getPg ().setTotalCount (totalCount);
        dto.getPg ().calStart ();
        if(totalCount>0){
	        List<ShopDto> rstList =  this.shopMapper.findShopList(dto);
	        BeanUtils.copyProperties (dto.getPg (),pg);	        
	        pg.setResultList (rstList);
        }else{
        	pg.setResultList(new ArrayList<ShopDto>());
        }
        pg.setTotalCount (totalCount);
        return pg;
	}
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<ShopDto> findShopList(ShopDto dto){
		return this.shopMapper.findShopList(dto);
	}
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public ShopDto getShop(Long id){
	   ShopDto dto = new ShopDto();
		dto.setId(id);
		List<ShopDto> list = shopMapper.findShopList(dto);
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
	public Long createShop(Shop shop){
		shop.setDefalutValue();
		return shopMapper.insertShop(shop);
	}
	
	/**
	 * 更新数据
	 * @param dto
	 * @return
	 */
	public int updateShop(Shop shop) {
		return this.shopMapper.updateShopByIds(shop);
	}
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteShopByIds(List<Long> ids){
    	return this.shopMapper.deleteShopByIds(ids);
    }
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteShopById(Long id){
    	return this.shopMapper.deleteShopById(id);
    }	
}