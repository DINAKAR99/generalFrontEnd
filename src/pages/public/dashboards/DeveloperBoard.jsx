import React, { useState } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import { publicAxios } from "../../../service/Interceptor";

const DeveloperBoard = () => {
  const [teamId, setTeamId] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [memberId, setMemberId] = useState("");
  const [tasks, setTasks] = useState([
    {
      taskId: "",
      fromDate: "",
      toDate: "",
      subtaskId: "",
      description: "",
    },
  ]);

  // Data arrays updated to group projects and members by team
  const teams = [
    { id: "T001", name: "Team Alpha" },
    { id: "T002", name: "Team Beta" },
  ];

  const projects = {
    T001: [
      { code: "P001", name: "Project Alpha" },
      { code: "P002", name: "Project Beta" },
    ],
    T002: [
      { code: "P003", name: "Project Gamma" },
      { code: "P004", name: "Project Delta" },
    ],
  };

  const members = {
    T001: [
      { id: "M001", name: "Alice" },
      { id: "M002", name: "Bob" },
    ],
    T002: [
      { id: "M003", name: "Charlie" },
      { id: "M004", name: "Diana" },
    ],
  };

  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1);

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
    const finalTasks = tasks.map((task) => ({
      projectCode,
      memberId,
      ...task,
    }));

    publicAxios
      .post(
        "/public/api/tasks",
        {
          tasks: finalTasks,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
        setProjectCode("");
        setMemberId("");
        setTasks([
          {
            taskId: "",
            fromDate: "",
            toDate: "",
            subtaskId: "",
            description: "",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Event handler for team selection
  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    setTeamId(selectedTeamId);
    setProjectCode(""); // Reset project and member on team change
    setMemberId("");
  };

  return (
    <div>
      <PublicLayout>
        <div className="text-center">
          <label>Team:</label>
          <select
            value={teamId}
            onChange={handleTeamChange}
            className="me-3"
            required
          >
            <option value="">--Select Team--</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <label>Project:</label>
          <select
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
            className="me-3"
            required
            disabled={!teamId}
          >
            <option value="">--Select Project--</option>
            {teamId &&
              projects[teamId]?.map((project) => (
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
            disabled={!teamId}
          >
            <option value="">--Select Member--</option>
            {teamId &&
              members[teamId]?.map((member) => (
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
                <th>Description</th>
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
                      className="form-control"
                      name="taskId"
                      value={task.taskId}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="fromDate"
                      value={task.fromDate}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="toDate"
                      value={task.toDate}
                      onChange={(e) => handleTaskChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
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
                <td colSpan="8">
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
