import React, { useState } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";

const DeveloperBoard = () => {
  const [projectCode, setProjectCode] = useState("");
  const [memberId, setMemberId] = useState("");
  const [tasks, setTasks] = useState([
    {
      taskId: "",
      fromDate: "",
      toDate: "",
      subtaskId: "", // Default to empty subtask ID
    },
  ]);

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const newTasks = [...tasks];
    newTasks[index][name] = value;
    setTasks(newTasks);
  };

  const addTaskRow = () => {
    setTasks([
      ...tasks,
      {
        taskId: "",
        fromDate: "",
        toDate: "",
        subtaskId: "", // Default to empty for new row
      },
    ]);
  };

  const removeTaskRow = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTasks = tasks.map((task) => ({
      ...task,
      projectCode,
      memberId,
    }));

    // Send data to the backend
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectCode,
        memberId,
        tasks: finalTasks,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        console.log("Success:", data);
        // Reset form after submission
        setProjectCode("");
        setMemberId("");
        setTasks([{ taskId: "", fromDate: "", toDate: "", subtaskId: "" }]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Update projects and members to include IDs and codes
  const projects = [
    { code: "P001", name: "Project Alpha" },
    { code: "P002", name: "Project Beta" },
    { code: "P003", name: "Project Gamma" },
  ];
  const members = [
    { id: "M001", name: "Alice" },
    { id: "M002", name: "Bob" },
    { id: "M003", name: "Charlie" },
    { id: "M004", name: "Diana" },
  ];
  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1); // Options 1 to 10

  return (
    <div>
      <PublicLayout>
        {/* <h2>Assign Tasks to Team Members</h2> */}

        <div className="text-center ">
          <label>Project Name:</label>
          <select
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.code} value={project.code}>
                {project.name}
              </option>
            ))}
          </select>

          <label>Assign to Member:</label>
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
          >
            <option value="">Select a member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Project Code</th>
                <th>Task ID</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Assigned To</th>
                <th>Subtask ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={projectCode}
                      readOnly
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="taskId"
                      value={task.taskId}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="fromDate"
                      value={task.fromDate}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="toDate"
                      value={task.toDate}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={memberId}
                      readOnly
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                  </td>
                  <td>
                    <select
                      name="subtaskId"
                      value={task.subtaskId}
                      onChange={(e) => handleTaskChange(index, e)}
                    >
                      <option value="">Select Subtask ID</option>
                      {subtaskOptions.map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" onClick={() => removeTaskRow(index)}>
                      -
                    </button>
                    <button type="button" onClick={addTaskRow}>
                      +
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <button type="submit">Submit All Tasks</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </PublicLayout>
    </div>
  );
};

export default DeveloperBoard;
