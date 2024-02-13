package com.mfy98.testcase.repository;

import com.mfy98.testcase.entity.ScoreRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRecordRepository extends JpaRepository<ScoreRecord,Long> {
}
