// src/pages/Dashboard_v2.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard_v2.css";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/authSlice";
import { Box, styled } from "@mui/material";

// Sample folders data
const workspaceFolders = [
  { name: "Personal", taskCount: 5 },
  { name: "Work", taskCount: 8 },
  { name: "Urgent", taskCount: 3 },
  { name: "Ideas", taskCount: 2 },
];

// Create date objects instead of strings
const dateList: Date[] = Array.from({ length: 10 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 5 + i);
  return date;
});

// Sample tasks (in real app, you'd filter based on selected date)
const allTasks = [
  { title: "Task 1", time: "9:00 AM", date: format(new Date(), "yyyy-MM-dd") },
  { title: "Task 2", time: "11:00 AM", date: format(new Date(), "yyyy-MM-dd") },
  { title: "Task 3", time: "2:00 PM", date: format(new Date(), "yyyy-MM-dd") },
];

// Custom styled button
const BlackButton = styled(Button)({
  color: 'white',
  backgroundColor: 'black',
  border: '2px solid black', // Thicker border
  '&:hover': {
    backgroundColor: 'red',
    borderColor: 'red',
  },
});

const Dashboard_v2: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  const filteredTasks = allTasks.filter(
    (task) => task.date === selectedDateString
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <BlackButton variant="contained" onClick={handleLogout}>
          Logout
        </BlackButton>
      </div>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-around',
        overflow: 'hidden'
      }}>
        <h2 >Your Workspace</h2>
        <h2>Recent Tasks</h2>


      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: '20px',
        height: 'calc(100vh - 150px)', // Adjust based on your header height
        overflow: 'hidden'
      }}>
        {/* Left Section - Workspace */}
        <Box sx={{ 
          width: '50%',
          overflowY: 'auto',
          paddingRight: '10px'
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            m: '20px',
            gap: '15px'
          }}>
            {workspaceFolders.map((folder, index) => (
              <Box key={index} sx={{
                backgroundColor: "SeaShell",
                p: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <h4>{folder.name}</h4>
                <p>{folder.taskCount} tasks</p>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Section - Recent Tasks */}
        <Box sx={{ 
          width: '50%',
          overflowY: 'auto'
        }}><Box sx={{}}>
          
          
          {/* Horizontal date scroll */}
          <Box sx={{ overflowX: 'auto', mb: 2 }}>
            <Box sx={{
                
                paddingTop:'1px',
                marginTop:'1px',
                display: 'flex',
                gap: '3px',
                pb: 1
            }}>
              {dateList.map((date, index) => {
                const isSelected = format(date, "yyyy-MM-dd") === selectedDateString;
                return (
                  <Box
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    sx={{
                      p: 1,
                      minWidth: '40px',
                      minHeight: '30px',
                      maxHeight: '60px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderBottom: isSelected ? '2px solid black' : '1px solid #ddd',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <p>{format(date, "EEE")}</p>
                    <p>{format(date, "MMM d")}</p>
                  </Box>
                );
              })}
            </Box>
          </Box>
          </Box>

          {/* Vertical task scroll */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            m: '20px',
          }}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <Box key={index} sx={{
                    backgroundColor: "Azure",
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }
                }}>
                  <h4>{task.title}</h4>
                  <p>{task.time}</p>
                </Box>
              ))
            ) : (
              <Box sx={{ p: 2 }}>No tasks for selected date</Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard_v2;