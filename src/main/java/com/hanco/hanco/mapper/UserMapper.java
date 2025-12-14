package com.hanco.hanco.mapper;

import com.hanco.hanco.dto.request.UpdatePasswordRequestDto;
import com.hanco.hanco.dto.request.WeekPassRequestDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
    // user
    public List<Map<String, Object>> getAllUsers(String date);
    public List<Map<String, Object>> getContinuousCompleteCount();
    public List<Map<String, Object>> getAllUsersLastRead();
    public void updateLastRead(String id, Integer lastRead);
    public int updatePass(WeekPassRequestDto dto);
    public String findPassword(String id);
    public int updatePassword(UpdatePasswordRequestDto dto);
}
