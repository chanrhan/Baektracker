package com.baektracker.domain.user.repository;

import com.baektracker.domain.user.dto.UserInfo;
import com.baektracker.domain.user.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);

    @Query("""
                select new com.baektracker.domain.user.dto.UserInfo(
                           u.id,
                           u.username,
                           u.nickname,
                           u.password,
                           u.level,
                           u.lastRead,
                           u.streak,
                           count(wr.state)
                    )
                from User u
                left join WeeklyResult wr on u.id=wr.user.id and wr.state=3
                group by u.id
                order by u.level desc
            """)
    List<UserInfo> getUserInfo();
}
