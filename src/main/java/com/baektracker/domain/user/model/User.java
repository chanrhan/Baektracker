package com.baektracker.domain.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "users")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname")
    private String nickname;

    @ColumnDefault("0")
    @Column(name = "streak", nullable = false)
    private Integer streak;

    @ColumnDefault("-1")
    @Column(name = "last_read", nullable = false)
    private Integer lastRead;

    @Column(name = "last_read_time", nullable = true)
    private LocalDateTime lastReadTime;

    public void updatePassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    public void updateLastRead(Integer lastRead) {
        this.lastRead = lastRead;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

}
