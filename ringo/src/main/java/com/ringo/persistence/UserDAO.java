package com.ringo.persistence;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.ringo.domain.UserVO;
import com.ringo.domain.SettingVO;

public interface UserDAO {

	public UserVO selectUser(UserVO vo);
	public Integer insertUser(UserVO vo);
	public Integer selectLastCode();
	public Integer selectDuplication(String target, String data);
	public UserVO selectUserProfile(String user_code);
}
