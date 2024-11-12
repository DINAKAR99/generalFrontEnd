import React, { useEffect, useState } from "react";
import { publicAxios } from "../../../service/Interceptor"; // Assuming you're using axios for the API call
import PublicLayout from "../../../Layouts/PublicLayout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch today's tasks on component mount
    fetchTodayTasks();
  }, []);

  const fetchTodayTasks = async () => {
    try {
      // Fetch the task data (we assume this API returns the new fields in the task objects)
      const response = await publicAxios.post("/public/api/tasks/today", {});
      setTasks(response.data); // Store tasks in state
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const exportToExcel = () => {
    // Create a table element from the DOM table
    const table = document.getElementById("myTable");

    // Convert the table into a worksheet
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Apply bold styling to the header row (first row)
    const headerRow = worksheet["!rows"] || []; // Access existing row styles (if any)

    // Style the first row (header row) to be bold
    for (let col = 0; col < 17; col++) {
      // Assuming there are 17 columns
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col }); // Get the cell reference for the header
      if (!worksheet[cellRef]) {
        worksheet[cellRef] = {}; // If the header cell is not defined, create it
      }
      worksheet[cellRef].s = { font: { bold: true } }; // Set the font style to bold
    }

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export the Excel file
    XLSX.writeFile(workbook, "Worklog_report.xlsx");
  };

  return (
    <PublicLayout>
      <Button variant="contained" className="ms-2" onClick={exportToExcel}>
        Export to Excel{" "}
        <i class="fa-regular fa-file-excel ms-1 bg-success "></i>
      </Button>
      <div>
        <h2>All Tasks</h2>
        <table
          style={{ borderCollapse: "collapse", width: "100%" }}
          id="myTable"
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Project Code
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Module ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Member ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Task ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subtask ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subtask Description
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Task Assigned Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Planned Start Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Planned End Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actual Start Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actual End Date
              </th>

              <th style={{ border: "1px solid black", padding: "8px" }}>
                Planned Hours
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actual Hours
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Category
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Priority
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Complexity
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={`${task.taskId}-${index}`}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.projectCode}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.moduleId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.memberId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {`${task.projectCode}-${task.taskId}`}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.description}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.subtaskId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.subtaskDesc}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.taskAssigned}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.fromDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.toDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.actualfromDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.actualtoDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.plannedHours}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.actualHours}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.status}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.category}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.priority}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.complexity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="17"
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  No tasks for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PublicLayout>
  );
};

export default TaskDashboard;
