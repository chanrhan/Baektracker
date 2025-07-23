package com.hanco.hanco.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanco.hanco.enums.SolvedAcResultType;
import com.hanco.hanco.mapper.SolvedAcMapper;
import com.hanco.hanco.util.ExternalApiUtils;
import com.hanco.hanco.util.TimeUtils;
import com.hanco.hanco.vo.SolvedAcRequestVO;
import com.hanco.hanco.vo.SolvedAcResponseVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Log4j2
public class SolvedAcService {
	private final SolvedAcMapper solvedAcMapper;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static final String Baekjoon_Problem_Status_Page_URL = "https://www.acmicpc.net/status";
    private static final String Solved_ac_user_show_URL = "https://solved.ac/api/v3/search/user?query=";

    public List<Map<String,Object>> getProblemInfoList(String keyword){
        return solvedAcMapper.getProblemInfoList(keyword);
    }

    public void insertWeeklyScore(int target, int fine){
        solvedAcMapper.insertWeeklyScore(target, fine);
    }

    public String getWeeklySharedSolved(String date){
        return solvedAcMapper.getWeeklySharedSolved(date);
    }

    public List<Map<String,Object>> getTotalFine(){
        return solvedAcMapper.getTotalFine();
    }

    public List<Map<String,Object>> getMonthFine(String date){
        return solvedAcMapper.getMonthFine(date);
    }

    @Transactional
    public void updateSharedProblem(String date, List<Integer> list){
        solvedAcMapper.deleteSharedProblemAll();
        solvedAcMapper.insertSharedProblem(date, list);
    }

    @Transactional
    public List<Map<String,Object>> getSharedProblem(String date){
        List<Map<String,Object>> sp_list = solvedAcMapper.getSharedProblem(date);
        for(Map<String,Object> item : sp_list){
//            System.out.println("shared: "+item);
            if(Objects.isNull(item.get("title")) || !StringUtils.hasText(item.get("title").toString())){
                try{
                    int problemId = Integer.parseInt(item.get("problem_id").toString());
                    Map<String,Object> problemInfo = getProblemInfo(problemId);
//                    System.out.println("pr:"+problemInfo);
                    String title = problemInfo.get("titleKo").toString();
                    int level = Integer.parseInt(problemInfo.get("level").toString());
                    item.put("title", title);
                    item.put("level", level);
                    solvedAcMapper.insertBaekjoonProblem(problemId, title, level);
                }catch (NullPointerException e){
                    e.printStackTrace();
                }
            }
        }
        return sp_list;
    }

    public List<Map<String,Object>> getAllUsers(String date){
        List<Map<String,Object>> users = solvedAcMapper.getAllUsers(date);
        for (Map<String,Object> user : users){
            String uri = Solved_ac_user_show_URL + user.get("id").toString();
            try {
//                System.out.println("aaa request : " + uri);
                Map<String,Object> res = ExternalApiUtils.solvedacAPIRequest(uri);
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
//        System.out.println("before sort : " + users);
        users.sort((m1, m2)->{
            try{
                int tier1 = m1.containsKey("tier") ? Integer.parseInt(m1.get("tier").toString()) : - 100;
                int tier2 = m2.containsKey("tier") ? Integer.parseInt(m2.get("tier").toString()) : -100;
//                System.out.println("tier1 : " + tier1 + ", tier2 : " + tier2);
                return Integer.compare(tier2, tier1);
            }catch (NumberFormatException | NullPointerException e){
                e.printStackTrace();
                return 0;
            }
        });
//        System.out.println("after sort : " + users);


        return users;
    }
//
//	public Map<String,Object> getLoginedUserInfo(String username){
////		String uri = "https://solved.ac/api/v3/account/verify_credentials";
//        String uri = "https://solved.ac/api/v3/search/user?query="+username;
//
//    }

    public Map<String, Object> getProblemInfo(int problemId){
        String uri = "https://solved.ac/api/v3/problem/show?problemId="+problemId;
        try {
            Map<String,Object> info = ExternalApiUtils.solvedacAPIRequest(uri);
            System.out.println("ppp sprout: " + info.get("sprout"));
            if(info != null && info.get("sprout").equals(true)){

                info.put("level", "-"+info.get("level").toString());
            }
            System.out.println("ppp: "+info);
            return info;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Map<String,Object>> getProblems(SolvedAcRequestVO vo){
        return solvedAcMapper.getBaekjoonProblems(vo);
    }

    public int loadBaekjoonProblemStatus(){
        int count = 0;
        try {
            List<SolvedAcResponseVO> list = new ArrayList<>();

            List<Map<String,Object>> lastReads = solvedAcMapper.getAllUsersLastRead();
            for(Map<String,Object> map :lastReads){
                String username = map.get("id").toString();
                int lastRead = Integer.parseInt(map.get("last_read").toString());
//                System.out.println("id: "+username+",lr: "+lastRead);
                List<SolvedAcResponseVO> scrappedProblems = new ArrayList<>();
                int top = -1;
                do{
                    List<SolvedAcResponseVO> res = scrapBaekjoon(username, top, lastRead);
//                    System.out.println(res);
                    if(res == null || res.isEmpty()){
                        break;
                    }
                    scrappedProblems.addAll(res);
                    int bottom = res.get(res.size()-1).getSubmitId();
//                    if(bottom <= lastRead){
//                        break;
//                    }
                    top = bottom;
                }while (true);
                count += scrappedProblems.size();
                list.addAll(scrappedProblems);
                if(!scrappedProblems.isEmpty()){
                    int updatedLastRead = scrappedProblems.get(0).getSubmitId();
                    solvedAcMapper.updateLastRead(username, updatedLastRead);
                }
            }
            if(!list.isEmpty()){
                solvedAcMapper.insertMarkedProblems(list);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return count;
    }

    private List<SolvedAcResponseVO> scrapBaekjoon(String username, int top, int lastReadIndex) throws IOException {
        if(username == null || username.isEmpty()){
            return null;
        }
//        System.out.println("username: "+username+", top:" + top);
        Connection connection = Jsoup.connect(Baekjoon_Problem_Status_Page_URL + "?user_id="+username+"&top="+top);
        Document document = connection.get(); // GET 으로 요청하고, 요청 결과를 Document 객체로 반환
        Elements elements = document.getElementsByAttributeValue("id","status-table");
        Element element = elements.get(0);

        Element tbody = element.children().get(1);
        List<SolvedAcResponseVO> list = new ArrayList<>();
        try{
            int maxLength = tbody.children().size();
            for(int i=0;i<maxLength;++i){
                Element row = tbody.child(i);
//                System.out.println(row);
                Elements selects = row.select("td a.real-time-update.show-date");

                if(selects != null){
                    Element a = selects.get(0);
                    long timestamp = Long.parseLong(a.attr("data-timestamp"));
                    LocalDate dateTime = TimeUtils.parseTimestamp(timestamp).toLocalDate();
                    Elements tds = row.select("td");
                    int submitId = Integer.parseInt(tds.get(0).text());

                    if(submitId == top){
                        continue;
                    }

                    if(submitId <= lastReadIndex){
                        break;
                    }
                    int problemId = Integer.parseInt(tds.get(2).text());
                    if(!solvedAcMapper.existBaekjoonProblem(problemId)){
                        Map<String,Object> problemInfo = getProblemInfo(problemId);
                        String problemTitle = problemInfo.get("titleKo").toString();
                        int problemLevel = Integer.parseInt(problemInfo.get("level").toString());
                        solvedAcMapper.insertBaekjoonProblem(problemId, problemTitle, problemLevel);
                    }

                    String resultText = tds.get(3).text();
                    SolvedAcResultType resultType = null;
                    int elapsedTime = 0;
                    int usedMemory = 0;
                    String errorText = null;
                    try{
                        resultType = SolvedAcResultType.of(resultText);
                        elapsedTime = Integer.parseInt(tds.get(4).text());
                        usedMemory =  Integer.parseInt(tds.get(5).text());
                    }catch (IllegalArgumentException e){
                        // 일치하는 Enum 이 없을 경우
                        SolvedAcResultType.ErrorType errorType = SolvedAcResultType.getErrorType(resultText);
                        resultType = errorType.getType();
                        errorText = errorType.getErrorText();
                    }catch (NullPointerException e){

                    }

                    if(resultType == null){
                        continue;
                    }

                    SolvedAcResponseVO vo = SolvedAcResponseVO.builder()
                            .username(username)
                            .problemId(problemId)
                            .resultId(resultType.getStatus())
                            .elapsedTm(elapsedTime)
                            .usedMem(usedMemory)
                            .errorText(errorText)
                            .submitId(submitId)
                            .date(dateTime.format(formatter))
                            .build();
//                    System.out.println(vo);

                    list.add(vo);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return list;
    }

}
