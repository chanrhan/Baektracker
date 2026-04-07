package com.baektracker.domain.user.repository;

import com.baektracker.domain.user.dto.UserInfo;
import com.baektracker.domain.user.model.User;
import com.baektracker.global.code.ApiResponseCode;
import com.baektracker.global.exception.CustomException;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);

    default User getUserById(Long id) {
        return findUserById(id)
                .orElseThrow(() -> CustomException.of(ApiResponseCode.NOT_FOUND_USER, "user id: " + id));
    }

    @Query("""
                select new com.baektracker.domain.user.dto.UserInfo(
                           u.id,
                           u.username,
                           u.nickname,
                           u.password,
                           u.level,
                           u.rating,
                           u.lastRead,
                           u.streak,
                           u.pass
                    )
                from User u
                group by u.id
                order by u.rating desc
            """)
    List<UserInfo> getUserInfo();
}
