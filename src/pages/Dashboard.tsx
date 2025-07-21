// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalScroll from "../components/Dashboard/HorizontalScroll";
import "./Dashboard.css";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import { useAppDispatch} from "../redux/hooks";
import { logout } from "../redux/authSlice";


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

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  // Example logout button logic
const dispatch = useAppDispatch();

const handleLogout = () => {
  dispatch(logout()); // This should remove token from Redux + sessionStorage
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
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <h2>Your Workspace</h2>
      <HorizontalScroll cardClass="large-card">
        {workspaceFolders.map((folder, index) => (
          <div key={index}>
            <h4>{folder.name}</h4>
            <p>{folder.taskCount} tasks</p>
          </div>
        ))}
      </HorizontalScroll>

      <h2>Recent Tasks</h2>
      <HorizontalScroll cardClass="small-card">
        {dateList.map((date, index) => {
          const isSelected = format(date, "yyyy-MM-dd") === selectedDateString;
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(date)}
              className={isSelected ? "selected" : ""}
            >
              <p>{format(date, "EEE")}</p>
              <p>{format(date, "MMM d")}</p>
            </div>
          );
        })}
      </HorizontalScroll>

      <h3>Tasks for {format(selectedDate, "EEE MMM dd yyyy")}</h3>
      <HorizontalScroll cardClass="large-card">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div key={index}>
              <h4>{task.title}</h4>
              <p>{task.time}</p>
            </div>
          ))
        ) : (
          <div>No tasks for selected date</div>
        )}
      </HorizontalScroll>
    </div>
  );
};

export default Dashboard;
