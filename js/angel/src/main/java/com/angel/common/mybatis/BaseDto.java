package com.angel.common.mybatis;

import java.io.Serializable;

public class BaseDto  implements Serializable {
 
    private static final long serialVersionUID = 3252369591171798846L;

    public final static String DIRECTION_DESC = "desc";
    public final static String DIRECTION_ASC = "asc";
    
    //是否不分页，默认为空，表示要分页查询
    private Boolean notPage=false; //为空的时候表示要分页，不为空的时候表示不分页

    /**
     * 开始条数
     */
    private int start;

    /**
     * 范围/默认每页显示50条
     */
    private int limit = 30;

    /**
     * 总共数量
     */
    private int totalCount;

    /**
     * 页数
     */
    private int pgNumber;

    // 数据库字段名
    private String sort;

    /**
     * 分页时当前查询哪一页
     */
    private Long currentPage;

    // 方向
    private String dir = DIRECTION_ASC;

    private Integer mcSiteId;

    private String redirectUrl;// 跳转URL

    public String getSort () {
        return sort;
    }

    public void setSort (String sort) {
        this.sort = sort;
    }

    public String getDir () {
        return dir;
    }

    public void setDir (String dir) {
        this.dir = dir;
    }

    public Integer getMcSiteId () {
        return mcSiteId;
    }

    public void setMcSiteId (Integer mcSiteId) {
        this.mcSiteId = mcSiteId;
    }

    public String getRedirectUrl () {
        return redirectUrl;
    }

    public void setRedirectUrl (String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public Long getCurrentPage () {
        return currentPage;
    }

    public void setCurrentPage (Long currentPage) {
        this.currentPage = currentPage;
    }

    final public int getTotalCount () {
        return totalCount;
    }

    final public void setTotalCount (int totalCount) {
        this.totalCount = totalCount;
    }

    final public void calStart () {
        if (start >= totalCount) {
            start = ((int) ((totalCount - 1) / limit)) * limit;
        }
    }

    final public int getPgNumber () {
        this.pgNumber = start / limit + 1;
        return pgNumber;
    }

    final public void setPgNumber (int pgNumber) {
        if (pgNumber < 1)
            pgNumber = 1;
        start = (pgNumber - 1) * limit;
    }

    final public int getEnd () {
        return this.start + this.limit;
    }

    final public int getStart () {
        return start;
    }

    final public void setStart (int start) {
        this.start = start;
    }

    final public int getLimit () {
        return limit;
    }

    final public void setLimit (int limit) {
        if (limit < 1) {
            this.limit = 1;
        }
        else {
            this.limit = limit;
        }
    }

    /**
     * 页面最后一页是第几页
     * 
     * @author zoubihui
     * @date 2014-2-18
     * @int
     */
    final public int getLastPageNumber () {
        return (int) (Math.ceil ((double) getTotalCount () / getLimit ()));
    }

	public Boolean getNotPage() {
		return notPage;
	}

	public void setNotPage(Boolean notPage) {
		this.notPage = notPage;
	}

}
