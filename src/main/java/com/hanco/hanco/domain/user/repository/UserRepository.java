package com.hanco.hanco.domain.user.repository;

import com.hanco.hanco.domain.user.dto.UserInfo;
import com.hanco.hanco.domain.user.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);

    @Query("""
                select new com.hanco.hanco.domain.user.dto.UserInfo(
                           u.id,
                           u.username,
                           u.nickname,
                           u.password,
                           u.lastRead,
                           u.streak,
                           count(wr.state)
                    )
                from User u
                left join WeeklyResult wr on u.id=wr.user.id and wr.state=3
                group by u.id
            """)
    List<UserInfo> getUserInfo();
}
