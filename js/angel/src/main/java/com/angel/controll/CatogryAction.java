package com.angel.controll;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.angel.dto.CatogryDto;
import com.angel.mo.Shop;
import com.angel.service.CatogryService;

@Controller
@RequestMapping("/kind")
public class CatogryAction {
	private static final Logger logger = LoggerFactory.getLogger(CatogryAction.class);
	
	@Resource
	private CatogryService catogryService;
	
	@RequestMapping("/catogryList")
	@ResponseBody
	public List<CatogryDto> catogryList(@SessionAttribute Shop shop) {
		List<CatogryDto> list=new ArrayList<CatogryDto>();
		if(shop.getId()==null){
			logger.error("没有参数");
			return list;
		}
		CatogryDto dto=new CatogryDto();
		dto.setShopid(shop.getId());
		dto.setStart(0);
		dto.setLimit(500);
		list=this.catogryService.findCatogryList(dto);
		return list;
	}
	
}
