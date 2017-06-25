package com.angel.controll;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.angel.common.ResponeMsg;
import com.angel.common.mybatis.Pagination;
import com.angel.dto.CatogryDto;
import com.angel.dto.FoodDto;
import com.angel.mo.Food;
import com.angel.mo.Shop;
import com.angel.service.CatogryService;
import com.angel.service.FoodService;

@Controller
@RequestMapping("/kind")
public class CatogryAction {
	private static final Logger logger = LoggerFactory.getLogger(CatogryAction.class);
	
	@Resource
	private CatogryService catogryService;
	
	@Resource
	private FoodService foodService;
	
	@RequestMapping("/catogryList")
	@ResponseBody
	public Pagination<CatogryDto> catogryList(@RequestBody CatogryDto query,@SessionAttribute Shop shop) {
		Pagination<CatogryDto> pg=new Pagination<CatogryDto>();
		if(shop.getId()==null){
			logger.error("没有参数");
			return pg;
		}
		if(query==null){
			query=new  CatogryDto();
			query.setShopid(shop.getId());
			query.setStart(0);
			query.setLimit(500);
		}
		
		return this.catogryService.findCatogryPg(query);
	}
	
	@RequestMapping("/addCatogry")
	@ResponseBody
	public ResponeMsg addCatogry(@RequestBody CatogryDto query, @SessionAttribute Shop shop) {
		ResponeMsg msg = new ResponeMsg();
		try {
			query.setShopid(shop.getId());
			Long id = this.catogryService.createCatogry(query);
			msg.setStatus(ResponeMsg.sus);
			msg.getData().put("id", id);
		} catch (Exception e) {
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg(e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return msg;
	}
	
	
	@RequestMapping(value = "/delCatogry")
	@ResponseBody
	public ResponeMsg delCatogry(@RequestBody CatogryDto query) throws Exception {
		ResponeMsg msg = new ResponeMsg();
		CatogryDto food=this.catogryService.getCatogry(query.getId());
		if(food!=null){
			FoodDto dto=new FoodDto();
			dto.setCatogryid(query.getId());;
			List<FoodDto> foodList=this.foodService.findFoodList(dto);
			if(CollectionUtils.isEmpty(foodList)){
				this.catogryService.deleteCatogryById(query.getId());
				msg.setStatus(ResponeMsg.sus);
			}else{
				msg.setStatus(ResponeMsg.fail);
				msg.setErrMsg("这个类别下还有菜品存在，不能删除");
			}
			
		}else{
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg("对应数据不存在");
		}
		return msg;
	}
	
}
