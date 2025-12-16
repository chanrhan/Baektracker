package com.hanco.hanco.domain.problem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table("problems")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaekjoonProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "level", columnDefinition = "0")
    private Integer level;

    @Column(name = "limit_time", columnDefinition = "0")
    private Integer limitTime;
}
