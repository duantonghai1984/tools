package com.angel.controll;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.alibaba.fastjson.JSON;
import com.angel.common.AngelUtil;
import com.angel.dto.FoodDto;
import com.angel.mo.Shop;
import com.angel.service.FoodService;
import com.mysql.jdbc.StringUtils;

@Controller
@RequestMapping("/food")
public class FoodAction {
	private static final Logger logger = LoggerFactory.getLogger(FoodAction.class);
	
	@Resource
	private FoodService foodService;
	
	
	@RequestMapping("/foodList")
	@ResponseBody
	public List<FoodDto> foodList(@RequestBody FoodDto query,@SessionAttribute Shop shop) {
		
		System.out.println(JSON.toJSON(shop));
		if(StringUtils.isNullOrEmpty(query.getName())){
			query.setName(null);
		}
		
		if(StringUtils.isNullOrEmpty(query.getpName())){
			query.setpName(null);
		}
		query.setShopid(shop.getId());
		List<FoodDto> list=new ArrayList<FoodDto>();
		if(query.getShopid()==null && query.getCatogryid()==null && StringUtils.isNullOrEmpty(query.getpName())){
			logger.error("没有参数");
			return list;
		}
		list=this.foodService.findFoodList(query);
		return list;
	}
	
	
}
