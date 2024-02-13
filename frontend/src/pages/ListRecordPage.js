import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Switch from '@mui/material/Switch';
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Modal,
  Typography
} from "@mui/material";

const ListRecordPage = () => {
  const [scoreRecords, setScoreRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [value, setValue] = useState('one');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const handleAddRecord = () => {
    navigate("/create");
  };
  useEffect(() => {
    fetchScoreRecords();
  }, []);
  const handleView = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    sortScoreRecords(newValue, sortOrder);
  };
  const handleSwitchChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    sortScoreRecords(value, sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const fetchScoreRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/records");
      console.log("API response:", response.data);
      setScoreRecords(response.data);
    } catch (error) {
      console.error("Error fetching score records:", error);
    }
    setLoading(false);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/records/${id}`);
      
      setScoreRecords(prevRecords => prevRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting score record:", error);
    }
  };
  const sortScoreRecords = (selectedTab, order) => {
    let sortedRecords = [...scoreRecords];

    switch (selectedTab) {
      case 'one':
        sortedRecords.sort((a, b) => {
          const compareResult = a.name.localeCompare(b.name);
          return order === 'asc' ? compareResult : -compareResult;
        });
        break;
      case 'two':
        sortedRecords.sort((a, b) => {
          const compareResult = a.surname.localeCompare(b.surname);
          return order === 'asc' ? compareResult : -compareResult;
        });
        break;
      case 'three':
        sortedRecords.sort((a, b) => (order === 'asc' ? a.score - b.score : b.score - a.score));
        break;
      default:
        break;
    }

    setScoreRecords(sortedRecords);
  };

  return (
    <div>
        <div style={{position:'fixed', left:'200px', justifyContent:'center', alignItems:'center',textAlign:'center', top:'400px'}}>
        <div variant="outlined" color="secondary" style={{border:'1px solid black'}}>SORT BY:</div>
        <div>
        <Tabs
  value={value}
  onChange={handleChange}
  textColor="secondary"
  indicatorColor="secondary"
  aria-label="secondary tabs example">
  <Tab value="one" label="NAME" />
  <Tab value="two" label="SURNAME" />
  <Tab value="three" label="SCORE" />
  
    </Tabs>
    <FormControlLabel
          value="bottom"
          control={<Switch color="primary" checked={sortOrder === 'desc'} onChange={handleSwitchChange} />}
          label="ASC|DESC"
          labelPlacement="bottom"
        />
        </div>
        </div>
        
    
<TableContainer component={Paper}>
      <Table style={{display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
        <TableHead>
          
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : scoreRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No score records found.
              </TableCell>
            </TableRow>
          ) : (
            scoreRecords.map((scoreRecord) => (
              <TableRow key={scoreRecord.id}>
                <TableCell>{scoreRecord.name}</TableCell>
                <TableCell>{scoreRecord.surname}</TableCell>
                <TableCell>{scoreRecord.score}</TableCell>
                <TableCell>
                <div>
                    <Button style={{ marginRight:"25px" }}variant="outlined" color="primary" onClick={() => handleView(scoreRecord)}>
                      View
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(scoreRecord.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div style={{ border:'none', borderRadius: "15px", justifyContent: "center", background: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" gutterBottom component="div" style={{ textAlign: "center" ,background:'teal', color:'whitesmoke', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}>
            View Record
          </Typography>
          {selectedRecord && (
            <div key={selectedRecord.id}>
              <Typography style={{marginLeft:'10px'}}>ID: {selectedRecord.id}</Typography>
              <Typography style={{marginLeft:'10px'}}>Name: {selectedRecord.name}</Typography>
              <Typography style={{marginLeft:'10px'}}>Surname: {selectedRecord.surname}</Typography>
              <Typography style={{marginLeft:'10px'}}>Score: {selectedRecord.score}</Typography>
              <Typography style={{marginLeft:'10px'}}>Create Date: {selectedRecord.createDate}</Typography>
            </div>
          )}
        </div>
      </Modal>
    </TableContainer>
        <Button to="/create" style={{ fontSize:'26px' ,width:'250px', height:'100px' , background:"teal", color:'white', position: 'fixed', bottom: '400px', right: '150px' }} onClick={handleAddRecord}>
            Add Record
        </Button>
    </div>
    
  );
};

export default ListRecordPage;