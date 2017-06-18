package com.angel.controll;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angel.dto.CatogryDto;
import com.angel.mo.Catogry;
import com.angel.service.CatogryService;

@Controller
public class CatogryController {
	private static final Logger logger = LoggerFactory.getLogger(CatogryController.class);
	
	
	@Resource
	private CatogryService catogryService;
	
	@RequestMapping("/catogryList")
	@ResponseBody
	public List<CatogryDto> foodList(Integer shopId) {
		List<CatogryDto> list=new ArrayList<CatogryDto>();
		/*for(int i=0;i<20;i++){
			Catogry f=new Catogry();
			f.setId(Long.valueOf(i));
			f.setName("招牌"+i);
			list.add(f);
		}*/
		
		if(shopId==null){
			logger.error("没有参数");
			return list;
		}
		CatogryDto dto=new CatogryDto();
		dto.setShopid(shopId);
		dto.setStart(0);
		dto.setLimit(100);
		list=this.catogryService.findCatogryList(dto);
		return list;
	}
	
	
	
}
