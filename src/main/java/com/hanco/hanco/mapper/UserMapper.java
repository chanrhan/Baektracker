package com.hanco.hanco.mapper;

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
}
