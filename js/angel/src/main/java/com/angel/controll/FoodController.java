package com.angel.controll;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angel.dto.FoodDto;
import com.angel.service.FoodService;

@Controller
public class FoodController {
	private static final Logger logger = LoggerFactory.getLogger(FoodController.class);
	
	@Resource
	private FoodService foodService;
	
	
	@RequestMapping("/foodList")
	@ResponseBody
	public List<FoodDto> foodList( FoodDto query) {
		List<FoodDto> list=new ArrayList<FoodDto>();
		/*for(int i=0;i<20;i++){
			FoodDto f=new FoodDto();
			f.setId(Long.valueOf(i));
			f.setName("test"+i);
			f.setPrice("35");
			f.setImage("https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png");
			list.add(f);
		}*/
		if(query.getShopid()==null && query.getCatogryid()==null && StringUtils.isEmpty(query.getpName())){
			logger.error("没有参数");
			return list;
		}
		list=this.foodService.findFoodList(query);
		System.out.println("size:"+list.size());
		return list;
	}
	
	
	
}
