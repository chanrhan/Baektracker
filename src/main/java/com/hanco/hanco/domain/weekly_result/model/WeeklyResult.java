package com.hanco.hanco.domain.weekly_result.model;

import com.hanco.hanco.domain.user.model.User;
import com.hanco.hanco.domain.weekly_result.code.WeeklyResultState;
import com.hanco.hanco.domain.weekly_result.converter.WeeklyResultStatusConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "weekly_results")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeeklyResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "year_week", nullable = false)
    private String yearWeek;

    @Column(name = "score", columnDefinition = "0")
    private Integer score;

    @Convert(converter = WeeklyResultStatusConverter.class)
    private WeeklyResultState state;

    @Column(name = "fine", columnDefinition = "0")
    private Integer fine;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getUserId() {
        return user.getId();
    }

    public String getUserNickname() {
        return user.getNickname();
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setFine(int fine) {
        this.fine = fine;
    }

    public void setState(WeeklyResultState state) {
        this.state = state;
    }

    public static WeeklyResult from(String yearWeek, User user) {
        return WeeklyResult.builder()
                .yearWeek(yearWeek)
                .score(0)
                .state(WeeklyResultState.None)
                .fine(0)
                .user(user)
                .build();
    }
}
