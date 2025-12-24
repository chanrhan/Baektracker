package com.baektracker.domain.problem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "problems")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaekjoonProblem {
    @Id
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "level", nullable = false)
    private Integer level;
}
