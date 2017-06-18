package com.angel.common.mybatis;

import java.util.ArrayList;
import java.util.List;



public class Pagination<T> extends BaseDto {
    private static final long serialVersionUID = 3687438840805341687L;

    @SuppressWarnings({ "rawtypes", "unchecked" })
	private List<T> resultList = new ArrayList ();

    public List<T> getResultList () {
        return resultList;
    }

    public void setResultList (List<T> resultList) {
        this.resultList = resultList;
    }

    public static void main(String[] args) {
		System.out.println(1);
	}
}
