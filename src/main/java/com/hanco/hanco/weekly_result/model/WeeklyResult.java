package com.hanco.hanco.weekly_result.model;

import com.hanco.hanco.user.model.User;
import jakarta.persistence.Column;
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

    @Column(name = "week_id", nullable = false)
    private String weekId;

    @Column(name = "score", columnDefinition = "0")
    private Integer score;

    @Column(name = "state", columnDefinition = "0")
    private Integer state;

    @Column(name = "fine", columnDefinition = "0")
    private Integer fine;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
