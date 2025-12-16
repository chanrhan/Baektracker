package com.hanco.hanco.domain.problem.model;

import com.hanco.hanco.domain.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "solved_problems")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SolvedProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "submit_id", nullable = false)
    private Integer submitId;

    @Column(name = "result_id", nullable = false)
    private Integer resultId;

    @Column(name = "elapsed_time")
    private Integer elapsedTime;

    @Column(name = "used_memory")
    private Integer usedMemory;

    @Column(name = "language")
    private String language;

    @Column(name = "err_txt")
    private String errTxt;

    @Column(name = "try_dt")
    private LocalDate tryDt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private BaekjoonProblem problem;

    public Integer getProblemId() {
        return problem.getId();
    }

    public String getUserNickname() {
        return user.getNickname();
    }
}
