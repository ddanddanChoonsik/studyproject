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
	private String filtercode;
	private String filtername;
	private int price;
	private String color;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp created_at;
	private String filtercat;
	
	private String filter;
	private String[] filterItems;

}
