package com.angel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class MyCatStartTest {

	
		
		public static void main(String[] args) throws Exception {
			Connection connection = null;
			PreparedStatement ps = null;
			com.mysql.jdbc.Driver d;
			try {
				Class.forName("com.mysql.jdbc.Driver");
				String url = "jdbc:mysql://10.253.13.190:8066/test";
				String user="doc_test";
				String password="test";
				String sql="select * from dicts";
				
//				String url = "jdbc:mysql://localhost:3306/dmds";
//				String user="root";
//				String password="root";
//				String sql="select * from dmds";
				
				try {
					connection = DriverManager.getConnection(url,user,password);
				} catch (SQLException e) {
					String msg="url:"+url + ",user:"+user + ",password:"+password;
						throw new Exception("数据库连接获取异常："+msg,e);
				}
				ps = connection.prepareStatement(sql);
				
				System.out.println("over");

			} catch (Exception e) {
				throw new Exception(e.getMessage(),e);
			} finally{
				try {
					if(ps!=null){
						ps.close();
					}
					if(connection!=null){
						connection.close();
					}
				} catch (SQLException e) {
					throw new Exception(e.getMessage(),e);
				}
			}	
		}



}
