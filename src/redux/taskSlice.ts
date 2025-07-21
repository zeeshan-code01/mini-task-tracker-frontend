import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, createTask } from "../services/taskService";
import type { RootState } from "./store";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async actions
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (token: string) => {
  return await getTasks(token);
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ token, task }: { token: string; task: { title: string; description: string } }) => {
    await createTask(token, task);
    return await getTasks(token); // return updated list
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default taskSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.tasks;
