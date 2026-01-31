package com.baektracker.global.job;

import com.baektracker.domain.problem.service.SolvedAcService;
import com.baektracker.domain.user.model.User;
import com.baektracker.domain.user.repository.UserRepository;
import com.baektracker.domain.weekly_result.dto.SolvedAcUser;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class RecordUserLevelJobTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SolvedAcService solvedAcService;

    @Test
    void 유저_정보_갱신() {
        User u1 = User.builder().username("km1104rs").build();
        User u2 = User.builder().username("yem9087").build();
        User u3 = User.builder().username("jdsan21").build();
        User u4 = User.builder().username("il7592").build();
        User u5 = User.builder().username("lss52e0").build();
        User u6 = User.builder().username("jangsy0623").build();
        User u7 = User.builder().username("dmb07223").build();

        userRepository.save(u1);
        userRepository.save(u2);
        userRepository.save(u3);
        userRepository.save(u4);
        userRepository.save(u5);
        userRepository.save(u6);
        userRepository.save(u7);

        List<User> users = userRepository.findAll();
        for (User user : users) {
            SolvedAcUser solvedAcUser = solvedAcService.searchUser(user.getUsername());

            try {
                user.setLevel(solvedAcUser.items().get(0).tier());
                user.setRating(solvedAcUser.items().get(0).rating());
            } catch (NullPointerException e) {
                e.printStackTrace();
                continue;
            }
        }
    }
}
