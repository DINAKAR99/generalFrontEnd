import React, { useEffect, useState } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import { publicAxios } from "../../../service/Interceptor";

const EmployeeTaskBoard = ({ userId, teamId }) => {
  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    setMemberId(sessionStorage.getItem("userid"));
  }, []);
  const [tasks, setTasks] = useState([
    {
      projectCode: "",
      taskId: "",
      fromDate: "",
      toDate: "",
      subtaskId: "",
      description: "",
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
        projectCode: "",
        taskId: "",
        fromDate: "",
        toDate: "",
        subtaskId: "",
        description: "",
      },
    ]);
  };

  const removeTaskRow = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberId === null || memberId === undefined) {
      console.error("User not logged in.");
      alert("no");
      return false; // Return early if user is not logged in. This prevents the API call from being made.
    }
    const finalTasks = tasks.map((task) => ({
      ...task, // Spread individual task details
      memberId,
    }));

    publicAxios
      .post(
        "/public/api/tasks",
        { tasks: finalTasks },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log(response.data);
        }
        // throw new Error("Network response was not ok");
      })
      .then((data) => {
        console.log("Tasks submitted:", data);
        setTasks([
          {
            projectCode: "",
            taskId: "",
            fromDate: "",
            toDate: "",
            subtaskId: "",
            description: "",
          },
        ]);
      })
      .catch((error) => {
        console.error("Submission error:", error);
      });
  };

  const projects = [
    { code: "P001", name: "Project Alpha" },
    { code: "P002", name: "Project Beta" },
    { code: "P003", name: "Project Gamma" },
  ];

  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <PublicLayout>
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Task ID</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Subtask ID</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>
                    <select
                      name="projectCode"
                      value={task.projectCode}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                      className="form-control"
                    >
                      <option value="">Select Project</option>
                      {projects.map((project) => (
                        <option key={project.code} value={project.code}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="taskId"
                      value={task.taskId}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      name="fromDate"
                      value={task.fromDate}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      name="toDate"
                      value={task.toDate}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
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
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      value={task.description}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                      placeholder="Task Description"
                    />
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

export default EmployeeTaskBoard;
