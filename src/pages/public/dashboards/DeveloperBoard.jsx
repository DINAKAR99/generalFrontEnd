import React, { useState, useEffect } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import { publicAxios } from "../../../service/Interceptor";

const DeveloperBoard = () => {
  const [teamId, setTeamId] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [moduleId, setModuleId] = useState(""); // New state for selected module
  const [memberId, setMemberId] = useState("");
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [taskCount, setTaskCount] = useState(0); // To store the current task count

  // Data arrays updated to group projects, members, and modules by team
  const teams = [
    { id: "EODB", name: "Team EODB" },
    { id: "RTC", name: "Team RTC" },
    { id: "MIV", name: "Team MIV" },
  ];

  const projects = {
    EODB: [
      { code: "BLR", name: "BOILERS" },
      { code: "FCT", name: "FACTORIES" },
      { code: "LBR", name: "LABOUR" },
      { code: "ROW", name: "TFIBER" },
      { code: "RC", name: "ROAD-CUTTING" },
    ],
    RTC: [
      { code: "P003", name: "Project Gamma" },
      { code: "P004", name: "Project Delta" },
    ],
  };

  const members = {
    EODB: [
      { id: "2397", name: "Dinakar" },
      { id: "M002", name: "Bob" },
    ],
    RTC: [
      { id: "M003", name: "Charlie" },
      { id: "M004", name: "Diana" },
    ],
  };

  const modules = {
    BLR: [{ id: "NA", name: "NA" }],
    LBR: [{ id: "NA", name: "NA" }],
    FCT: [{ id: "NA", name: "NA" }],
    ROW: [{ id: "NA", name: "NA" }],
    RC: [
      { id: "M1", name: "Module D1" },
      { id: "M2", name: "Module D2" },
    ],
  };

  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const categories = ["Bug", "Feature", "Enhancement"];
  const priorities = ["Low", "Medium", "High"];
  const complexities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "In Progress", "Closed"];

  useEffect(() => {
    if (projectCode) {
      publicAxios
        .get(`/public/api/tasks/count?projectCode=${projectCode}`)
        .then((response) => {
          console.log("API Response:", response); // Log the entire response

          const count = response.data;
          const parsedCount = Number(count);

          if (!isNaN(parsedCount)) {
            setTaskCount(parsedCount); // Only set taskCount if it's a valid number
          } else {
            console.error("Invalid task count received:", count);
          }
        })
        .catch((error) => {
          console.error("Error fetching task count:", error);
        });
    }
  }, [projectCode]);

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        {
          taskId: `T${taskCount + 1}`, // Initialize with the correct task ID
          fromDate: "",
          toDate: "",
          subtaskId: "",
          subtaskDesc: "",
          description: "",
          plannedHours: "",
          category: "",
          priority: "",
          complexity: "",
          status: "",
        },
      ]);
    }
  }, [taskCount, tasks]);

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const newTasks = [...tasks];
    newTasks[index][name] = value;
    setTasks(newTasks);
  };

  const addTaskRow = () => {
    if (isNaN(taskCount)) {
      console.error("taskCount is not a valid number");
    } else {
      const taskId = `T${taskCount + 1}`;
      console.log(taskId);
    }

    setTaskCount(taskCount + 1);
    setTasks([
      ...tasks,
      {
        taskId: `T${taskCount + 1}`, // Auto-generate taskId dynamically
        fromDate: "",
        toDate: "",
        subtaskId: "",
        subtaskDesc: "",
        description: "",
        plannedHours: "",
        category: "",
        priority: "",
        complexity: "",
        status: "",
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
      moduleId,
      memberId,
      ...task,
    }));

    publicAxios
      .post(
        "public/api/tasks",
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
        // Reset form state after submission
        setProjectCode("");
        setModuleId(""); // Reset module selection after submission
        setMemberId("");
        setTasks([]);
        setTaskCount(0); // Reset task count after submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    setTeamId(selectedTeamId);
    setProjectCode(""); // Reset project and member on team change
    setModuleId(""); // Reset module on team change
    setMemberId(""); // Reset member on team change
  };

  const handleProjectChange = (e) => {
    const selectedProjectCode = e.target.value;
    setProjectCode(selectedProjectCode);
    setModuleId(""); // Reset module on project change
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
            onChange={handleProjectChange}
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

          <label>Module:</label>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            className="me-3"
            required
            disabled={!projectCode}
          >
            <option value="">--Select Module--</option>
            {projectCode &&
              modules[projectCode]?.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
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
          <div style={{ overflowX: "scroll" }}>
            <table style={{ width: "130%" }}>
              <thead>
                <tr>
                  <th>Project Code</th>
                  <th>Module Code</th>
                  <th>Task ID</th>
                  <th>Planned Hours</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Complexity</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Assigned To</th>
                  <th>Subtask ID</th>
                  <th>Subtask Description</th>
                  <th>Status</th>
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
                        value={moduleId}
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
                        name="plannedHours"
                        value={task.plannedHours}
                        onChange={(e) => handleTaskChange(index, e)}
                        placeholder="e.g. 1 hour, 2 hours, 30 mins"
                        required
                      />
                    </td>
                    <td>
                      <select
                        className="form-control"
                        name="category"
                        value={task.category}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        name="priority"
                        value={task.priority}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">Select Priority</option>
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        name="complexity"
                        value={task.complexity}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">Select Complexity</option>
                        {complexities.map((complexity) => (
                          <option key={complexity} value={complexity}>
                            {complexity}
                          </option>
                        ))}
                      </select>
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
                      {task.subtaskId && task.subtaskId !== "" ? (
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="subtaskDesc"
                          value={task.subtaskDesc}
                          onChange={(e) => handleTaskChange(index, e)}
                          placeholder="Enter subtask description"
                        />
                      ) : (
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          name="subtaskDesc"
                          value={task.subtaskDesc}
                          onChange={(e) => handleTaskChange(index, e)}
                          placeholder=" "
                        />
                      )}
                    </td>
                    <td>
                      <select
                        className="form-control"
                        name="status"
                        value={task.status}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        name="description"
                        value={task.description}
                        onChange={(e) => handleTaskChange(index, e)}
                        required
                        placeholder="Task Description"
                        rows="3"
                        style={{ resize: "vertical" }}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeTaskRow(index)}
                      >
                        -
                      </button>
                      <button type="button" onClick={addTaskRow}>
                        +
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="13">
                    <button type="submit">Submit All Tasks</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </PublicLayout>
    </div>
  );
};

export default DeveloperBoard;
