package data.vo;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("shop")
@Data
public class ShopVo {
	
	private int num;
	private String name;
	private String filter_name; // Updated property name to match the column
	private int price;
	private String filter_code;
	private String color;
	@JsonFormat(pattern = "yyyy-MM-dd" , timezone="Asia/Seoul")
	private Timestamp created_at;
	private String filter_cat; // Updated property name to match the column
	
	private String search;
	private String filter;
	private String[] filterItems;
}
