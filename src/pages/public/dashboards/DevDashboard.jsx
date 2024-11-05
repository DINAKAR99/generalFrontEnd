import React, { useEffect, useState } from "react";
import { publicAxios } from "../../../service/Interceptor";
import PublicLayout from "../../../Layouts/PublicLayout";

const DevDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rangeTasks, setRangeTasks] = useState([]);

  useEffect(() => {
    // Fetch today's tasks by default on first render
    fetchTodayTasks();
  }, []);

  const fetchTasksByDateRange = async () => {
    if (!fromDate || !toDate) {
      console.error("Both dates must be selected.");
      return;
    }

    // Clear the previous tasks to avoid confusion
    setRangeTasks([]);

    try {
      //also send userid
      const response = await publicAxios.post("/public/api/tasks/range", {
        fromDate,
        toDate,
      });
      setRangeTasks(response.data); // Store the tasks for the selected date range
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTodayTasks = async () => {
    try {
      //send user id
      const response = await publicAxios.post("/public/api/tasks/today", {});
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching today's tasks:", error);
    }
  };

  return (
    <PublicLayout>
      <div>
        <h2>Today's Tasks</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Task ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                From Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                To Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subtask ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={`${task.taskId}-${index}`}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.taskId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.fromDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.toDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.subtaskId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "8px" }}>
                  No tasks for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Date Range Selection */}
        <h2 style={{ marginTop: "40px" }}>Fetch Tasks By Date Range</h2>
        <div style={{ marginBottom: "20px" }}>
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label style={{ marginLeft: "20px" }}>
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button
            onClick={fetchTasksByDateRange}
            style={{ marginLeft: "20px" }}
          >
            Fetch Tasks
          </button>
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Task ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                From Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                To Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subtask ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rangeTasks.length > 0 ? (
              rangeTasks.map((task, index) => (
                <tr key={`${task.taskId}-${index}`}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.taskId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.fromDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.toDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.subtaskId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "8px" }}>
                  No tasks for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PublicLayout>
  );
};

export default DevDashboard;
