// src/pages/Dashboard_v2.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard_v2.css";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";
import { Box, styled } from "@mui/material";

// Custom styled button
const BlackButton = styled(Button)({
  color: "white",
  backgroundColor: "black",
  border: "2px solid black",
  "&:hover": {
    backgroundColor: "red",
    borderColor: "red",
  },
});

// Create date objects for recent 10 days
const dateList: Date[] = Array.from({ length: 10 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 5 + i);
  return date;
});

const Dashboard_v2: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const selectedDateString = format(selectedDate, "yyyy-MM-dd");

  const filteredTasks = tasks.filter(
    (task) =>
      format(new Date(task.createdAt || new Date()), "yyyy-MM-dd") ===
      selectedDateString
  );

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://localhost:7196/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <BlackButton variant="contained" onClick={handleLogout}>
          Logout
        </BlackButton>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <h2>Your Workspace</h2>
        <h2>Recent Tasks</h2>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          height: "calc(100vh - 150px)",
          overflow: "hidden",
        }}
      >
        {/* Left Section - Workspace */}
        <Box
          sx={{
            width: "50%",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "20px",
              gap: "15px",
            }}
          >
            {/* Placeholder folders — you will replace this with real folders later */}
            {["Personal", "Work", "Urgent", "Ideas"].map((name, index) => {
              const taskCount = tasks.filter((t) => t.folderName === name)
                .length;
              return (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "SeaShell",
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <h4>{name}</h4>
                  <p>{taskCount} tasks</p>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Right Section - Recent Tasks */}
        <Box sx={{ width: "50%", overflowY: "auto" }}>
          {/* Horizontal Date Scroll */}
          <Box sx={{ overflowX: "auto", mb: 2 }}>
            <Box
              sx={{
                paddingTop: "1px",
                marginTop: "1px",
                display: "flex",
                gap: "3px",
                pb: 1,
              }}
            >
              {dateList.map((date, index) => {
                const isSelected =
                  format(date, "yyyy-MM-dd") === selectedDateString;
                return (
                  <Box
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    sx={{
                      p: 1,
                      minWidth: "40px",
                      minHeight: "30px",
                      maxHeight: "60px",
                      textAlign: "center",
                      cursor: "pointer",
                      borderBottom: isSelected
                        ? "2px solid black"
                        : "1px solid #ddd",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <p>{format(date, "EEE")}</p>
                    <p>{format(date, "MMM d")}</p>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Task List */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              m: "20px",
            }}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "Azure",
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>Status: {task.status}</p>
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
