import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [workstreams, setWorkstreams] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [scopeItems, setScopeItems] = useState('');
  const [uatPlan, setUatPlan] = useState([]);

  const generateUATPlan = async () => {
    try {
      const response = await axios.post(`${API_URL}/uat-plan`, {
        workstreams: workstreams.split(',').map(item => item.trim()),
        stakeholders: stakeholders.split(',').map(item => item.trim()),
        scope_items: scopeItems.split(',').map(item => item.trim()),
      });
      setUatPlan(response.data);
    } catch (error) {
      console.error('Error generating UAT plan:', error);
    }
  };

  const exportUATPlan = async () => {
    try {
      const response = await axios.get(`${API_URL}/uat-plan/export`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'uat_plan.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting UAT plan:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>UXR UAT Plan Generator</Typography>
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
      <Button variant="contained" color="primary" onClick={generateUATPlan} style={{ marginRight: 10 }}>
        Generate UAT Plan
      </Button>
      <Button variant="contained" color="secondary" onClick={exportUATPlan} disabled={uatPlan.length === 0}>
        Export to CSV
      </Button>
      {uatPlan.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
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
      )}
    </Container>
  );
}

export default App;