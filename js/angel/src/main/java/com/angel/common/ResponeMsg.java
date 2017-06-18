package com.angel.common;

import java.util.HashMap;
import java.util.Map;

public class ResponeMsg {
	
	public static final int sus=1;
	public static final int fail=2;
	public static final int check=3;
	
	private int status=ResponeMsg.sus; //1 success, 2 fail 3 need check;
	private String errMsg;
	
	private Map<String,Object> data=new HashMap<String,Object>();
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
	
	
	

}
