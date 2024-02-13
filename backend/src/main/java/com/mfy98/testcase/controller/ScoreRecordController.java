package com.mfy98.testcase.controller;

import com.mfy98.testcase.entity.ScoreRecord;
import com.mfy98.testcase.service.ScoreRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ScoreRecordController {
    private final ScoreRecordService scoreRecordService;
    public ScoreRecordController(ScoreRecordService scoreRecordService){
        this.scoreRecordService = scoreRecordService;
    }
    @GetMapping("/records")
    public List<ScoreRecord> getAllScoreRecords(){
        return scoreRecordService.getAllScoreRecords();
    }
    @GetMapping("/records/{id}")
    public ScoreRecord getScoreRecordById(@PathVariable Long id){
        return scoreRecordService.getScoreRecordById(id);
    }
    @PostMapping("/records")
    public ScoreRecord createScoreRecord(@RequestBody ScoreRecord newScoreRecord){
        return scoreRecordService.createScoreRecord(newScoreRecord);
    }
    @PutMapping("/records/{id}")
    public ScoreRecord updateScoreRecordById(@PathVariable Long id, @RequestBody ScoreRecord newScoreRecord){
        return scoreRecordService.updateScoreRecordById(id, newScoreRecord);
    }
    @DeleteMapping("/records/{id}")
    public void deleteScoreRecordById(@PathVariable Long id){
        scoreRecordService.deleteScoreRecordById(id);
    }
}
