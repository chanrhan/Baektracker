package com.hanco.hanco.domain.user.repository;

import com.hanco.hanco.domain.user.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);

}
