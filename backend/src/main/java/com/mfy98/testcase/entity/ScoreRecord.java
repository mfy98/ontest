package com.mfy98.testcase.entity;

import jakarta.persistence.*;
import lombok.Data;



import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(schema = "ScoreRecord")
public class ScoreRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "_name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "score")
    private int score;
    @Column(name = "createdate")
    private LocalDateTime createDate;

    public ScoreRecord() {
        this.createDate = LocalDateTime.now();
    }
    public void setCreateDate(LocalDateTime now) {
    }
}
