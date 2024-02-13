package com.mfy98.testcase.service;

import com.mfy98.testcase.entity.ScoreRecord;
import com.mfy98.testcase.repository.ScoreRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ScoreRecordService {
    private final ScoreRecordRepository scoreRecordRepository;

    public ScoreRecordService(ScoreRecordRepository scoreRecordRepository){
        this.scoreRecordRepository = scoreRecordRepository;
    }
   public List<ScoreRecord> getAllScoreRecords(){
        return scoreRecordRepository.findAll();
   }
   public ScoreRecord getScoreRecordById(Long id){
        Optional<ScoreRecord> scoreRecord = scoreRecordRepository.findById(id);
       if (scoreRecord.isEmpty()) {
           throw new NoSuchElementException("Score record not found with id:" + id);
       }
       return scoreRecord.get();
   }
   public ScoreRecord createScoreRecord(ScoreRecord scoreRecord){
        System.out.println(scoreRecord);
        scoreRecord.setCreateDate(LocalDateTime.now());
        System.out.println(scoreRecord);
        return scoreRecordRepository.save(scoreRecord);
   }
   public ScoreRecord updateScoreRecordById(Long id, ScoreRecord scoreRecord){
        scoreRecord = scoreRecordRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Score record not found with id:" + id));

        scoreRecord.setName(scoreRecord.getName());
        scoreRecord.setSurname(scoreRecord.getSurname());
        scoreRecord.setScore(scoreRecord.getScore());
        return scoreRecordRepository.save(scoreRecord);
   }

   public Map<String,Boolean> deleteScoreRecordById(Long id){
        ScoreRecord scoreRecord = getScoreRecordById(id);
        scoreRecordRepository.delete(scoreRecord);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
   }

}
