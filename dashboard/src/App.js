import React, { useEffect, useState, useCallback, useRef } from "react";
import Chart from "chart.js/auto";

// Material UI Components
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";

const API_BASE = "http://localhost:4000";

function App() {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const chartRef = useRef(null);

  // Load Chart
  const loadChart = useCallback((data) => {
    const ctx = document.getElementById("dataChart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => d.username),
        datasets: [
          {
            label: "Processed Values",
            data: data.map((d) => d.value),
            backgroundColor: "rgba(33, 150, 243, 0.6)",
            borderColor: "rgba(33, 150, 243, 1)",
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
    });
  }, []);

  // Fetch Raw Data
  const loadRawData = useCallback(async () => {
    const res = await fetch(API_BASE + "/analytics");
    const data = await res.json();
    setRawData(data);
  }, []);

  // Fetch Processed Data
  const loadProcessedData = useCallback(async () => {
    const res = await fetch(API_BASE + "/processed");
    const data = await res.json();
    setProcessedData(data);
    loadChart(data);
  }, [loadChart]);

  useEffect(() => {
    loadProcessedData();
    loadRawData();
  }, [loadProcessedData, loadRawData]);

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6">📊 Serverless Data Pipeline Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Raw Data */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Raw Data</Typography>
                <Button variant="contained" onClick={loadRawData} sx={{ mb: 2 }}>
                  Refresh Raw Data
                </Button>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Value</b></TableCell>
                      <TableCell><b>Timestamp</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rawData.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Processed Data */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Processed Data</Typography>
                <Button variant="contained" onClick={loadProcessedData} sx={{ mb: 2 }}>
                  Refresh Processed Data
                </Button>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Username</b></TableCell>
                      <TableCell><b>Value</b></TableCell>
                      <TableCell><b>Category</b></TableCell>
                      <TableCell><b>Processed At</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {processedData.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{new Date(item.processedAt).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Data Chart</Typography>
                <canvas id="dataChart" height="120"></canvas>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
