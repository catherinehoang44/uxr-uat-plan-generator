import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [workstreams, setWorkstreams] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [scopeItems, setScopeItems] = useState('');
  const [uatPlan, setUatPlan] = useState([]);

  const generateUATPlan = async () => {
    try {
      const response = await axios.post(`${API_URL}/uat-plan`, {
        workstreams: workstreams.split(','),
        stakeholders: stakeholders.split(','),
        scope_items: scopeItems.split(','),
      });
      setUatPlan(response.data);
    } catch (error) {
      console.error('Error generating UAT plan:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>UAT Plan Generator</Typography>
      <TextField
        label="Workstreams (comma-separated)"
        value={workstreams}
        onChange={(e) => setWorkstreams(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stakeholders (comma-separated)"
        value={stakeholders}
        onChange={(e) => setStakeholders(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Scope Items (comma-separated)"
        value={scopeItems}
        onChange={(e) => setScopeItems(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={generateUATPlan}>Generate UAT Plan</Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workstream</TableCell>
              <TableCell>Test Case</TableCell>
              <TableCell>Stakeholder</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uatPlan.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Workstream}</TableCell>
                <TableCell>{row['Test Case']}</TableCell>
                <TableCell>{row.Stakeholder}</TableCell>
                <TableCell>{row['Start Date']}</TableCell>
                <TableCell>{row['End Date']}</TableCell>
                <TableCell>{row.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;