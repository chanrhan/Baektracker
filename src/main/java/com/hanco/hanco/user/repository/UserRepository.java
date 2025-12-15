package com.hanco.hanco.user.repository;

import com.hanco.hanco.user.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);

}
