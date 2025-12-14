package com.hanco.hanco.service;

import com.hanco.hanco.dto.request.UpdatePasswordRequestDto;
import com.hanco.hanco.dto.request.WeekPassRequestDto;
import com.hanco.hanco.mapper.UserMapper;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final SolvedAcService solvedAcService;
    private final UserMapper userMapper;
    private static final String PASS_PWD = "\"091504\"";
    private final PasswordEncoder passwordEncoder;

    public void updateUserPassword(UpdatePasswordRequestDto dto){
        String password = userMapper.findPassword(dto.id());
        if(passwordEncoder.matches(password, dto.orgPwd())){
            userMapper.updatePassword(dto);
        }
    }

    public void updateWeekPass(WeekPassRequestDto dto){
        if(LocalDate.now().getDayOfWeek().getValue() >= 6){
            return;
        }
        String password = userMapper.findPassword(dto.id());
        if(passwordEncoder.matches(password, dto.password())){
            userMapper.updatePass(dto);
        }
    }

    public List<Map<String,Object>> getAllUsers(String date){
        List<Map<String,Object>> users = userMapper.getAllUsers(date);
        for (Map<String,Object> user : users){
//            String uri = Solved_ac_user_show_URL + user.get("id").toString();
            try {
//                System.out.println("aaa request : " + uri);
                Map<String,Object> res = solvedAcService.searchUsers(user.get("id").toString());
//                System.out.println(res);
                Map<String,Object> item = ((List<Map<String, Object>>)res.get("items")).get(0);
                if(item != null && !item.isEmpty()){
                    user.put("solved_count", item.get("solvedCount"));
                    user.put("tier", item.get("tier"));
                }else{
                    user.put("solved_count", 0);
                    user.put("tier", 0);
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        users.sort((m1, m2)->{
            try{
                int tier1 = m1.containsKey("tier") ? Integer.parseInt(m1.get("tier").toString()) : - 100;
                int tier2 = m2.containsKey("tier") ? Integer.parseInt(m2.get("tier").toString()) : -100;
                return Integer.compare(tier2, tier1);
            }catch (NumberFormatException | NullPointerException e){
                e.printStackTrace();
                return 0;
            }
        });
//        System.out.println("after sort : " + users);


        return users;
    }
}
