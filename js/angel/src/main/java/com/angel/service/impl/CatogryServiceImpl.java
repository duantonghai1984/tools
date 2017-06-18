package com.angel.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.angel.common.mybatis.Pagination;
import com.angel.dto.CatogryDto;
import com.angel.mapper.CatogryMapper;
import com.angel.mo.Catogry;
import com.angel.service.CatogryService;

@Service("catogryService")
public class CatogryServiceImpl implements CatogryService{

	 @Resource
     private CatogryMapper  catogryMapper;
     
     
	/**
	 * 分页查询
	 * @param dto
	 * @return
	 */
	public Pagination<CatogryDto> findCatogryPg(CatogryDto dto){
	
	  	Pagination<CatogryDto> pg = new Pagination<CatogryDto> ();
        int totalCount = this.catogryMapper.countCatogry(dto);

        dto.getPg ().setTotalCount (totalCount);
        dto.getPg ().calStart ();
        if(totalCount>0){
	        List<CatogryDto> rstList =  this.catogryMapper.findCatogryList(dto);
	        BeanUtils.copyProperties (dto.getPg (),pg);	        
	        pg.setResultList (rstList);
        }else{
        	pg.setResultList(new ArrayList<CatogryDto>());
        }
        pg.setTotalCount (totalCount);
        return pg;
	}
	
	/**
	 * 查询
	 * @param dto
	 * @return
	 */
	public List<CatogryDto> findCatogryList(CatogryDto dto){
		return this.catogryMapper.findCatogryList(dto);
	}
	
	
	/**
	 * 根据Id查询
	 * @param id
	 * @return
	 */
	public CatogryDto getCatogry(Long id){
	   CatogryDto dto = new CatogryDto();
		dto.setId(id);
		List<CatogryDto> list = catogryMapper.findCatogryList(dto);
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
	public Long createCatogry(Catogry catogry){
		catogry.setDefalutValue();
		return catogryMapper.insertCatogry(catogry);
	}
	
	/**
	 * 更新数据
	 * @param dto
	 * @return
	 */
	public int updateCatogry(Catogry catogry) {
		return this.catogryMapper.updateCatogryByIds(catogry);
	}
	
	
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 */
    public int deleteCatogryByIds(List<Long> ids){
    	return this.catogryMapper.deleteCatogryByIds(ids);
    }
    
    /**
	 * 删除数据，id
	 * @param id
	 * @return
	 */
    public int deleteCatogryById(Long id){
    	return this.catogryMapper.deleteCatogryById(id);
    }	
}