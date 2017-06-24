package com.angel.controll;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.angel.common.ResponeMsg;
import com.angel.common.mybatis.Pagination;
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
	public Pagination<FoodDto> foodList(@RequestBody FoodDto query,@SessionAttribute Shop shop) {
		
		System.out.println(JSON.toJSON(query));
		if(StringUtils.isNullOrEmpty(query.getName())){
			query.setName(null);
		}
		
		if(StringUtils.isNullOrEmpty(query.getpName())){
			query.setpName(null);
		}
		query.setShopid(shop.getId());
		Pagination<FoodDto> list=new Pagination<FoodDto>();
		if(query.getShopid()==null && query.getCatogryid()==null && StringUtils.isNullOrEmpty(query.getpName())){
			logger.error("没有参数");
			return list;
		}
		list=this.foodService.findFoodPg(query);
		return list;
	}
	
	
	/**
	 * 新增流程
	 * @param name
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@Value("${image.dir}")
	String dir;
	
	
	@RequestMapping(value="/uploadPic", method=RequestMethod.POST)
	@ResponseBody
	public ResponeMsg uploadPic(@RequestParam("file") MultipartFile file) throws Exception {
		ResponeMsg msg=new ResponeMsg();
		String fileName=System.currentTimeMillis()+".jpg";
		if (!file.isEmpty()) {
			try {
				FileOutputStream out=new FileOutputStream(new File(dir+File.separator+fileName));
				IOUtils.copy(file.getInputStream(),out );
				IOUtils.closeQuietly(out);
				msg.setStatus(ResponeMsg.sus);
			} catch (Exception e) {
				msg.setErrMsg(e.getMessage());
			}
		}
		 
		 msg.getData().put("name", fileName);
		 return msg;
	}
	
	
	@RequestMapping(value="/disImage")
	@ResponseBody
	public void disImage(@RequestParam("imageName") String imageName,HttpServletRequest request,
            HttpServletResponse response) throws Exception {
		InputStream imageStream=new FileInputStream(this.dir+File.separator+imageName);
		OutputStream stream = response.getOutputStream();
		IOUtils.copy(imageStream, stream);
		stream.flush();
		IOUtils.closeQuietly(stream);
		IOUtils.closeQuietly(imageStream);
		return;
	}
	
	@RequestMapping(value="/delImage")
	@ResponseBody
	public void delImage(@RequestParam("imageName") String imageName) throws Exception {
		FileUtils.forceDelete(new File(this.dir+File.separator+imageName));
		return;
	}
	
	
}
