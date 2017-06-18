package com.angel.service;

import java.util.List;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.CatogryDto;
import com.angel.mo.Catogry;

public interface CatogryService{


	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<CatogryDto> findCatogryPg(CatogryDto dto);
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<CatogryDto> findCatogryList(CatogryDto dto);
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public CatogryDto getCatogry(Long id);
	
	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long createCatogry(Catogry catogry);
	
	
	/**
	 * 修改数据
	 * @param dto
	 * @return
	 */
	public int updateCatogry(Catogry catogry);
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteCatogryByIds(List<Long> ids); 
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteCatogryById(Long id); 
	
	
}