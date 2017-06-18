package com.angel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.angel.dto.CatogryDto;
import com.angel.mo.Catogry;

@Mapper
public interface CatogryMapper{
	
	
	/**
	 * 具体最大数量1万
	 * @param dto
	 * @return
	 */
	public List<CatogryDto> findCatogryList(CatogryDto dto);
	

	
	/**
	 * 插入数据
	 * @param dto
	 * @return
	 */
	public Long insertCatogry(Catogry catogry);
	
	
	
	/**
	 * 统计数目
	 * @param dto
	 * @return
	 */
	public int countCatogry(CatogryDto dto);
	
	/**
	 * 更新数据，只根据id或者ids更新
	 * @param dto
	 * @return
	 */
    public int updateCatogryByIds(Catogry catogry);
    
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