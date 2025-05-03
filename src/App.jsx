import { useState } from "react";
import { Check, Plus, Edit2, Trash2, Pin } from "lucide-react";

const tagColors = [
  { name: "Red", color: "#e74c3c" },
  { name: "Orange", color: "#e67e22" },
  { name: "Yellow", color: "#f1c40f" },
  { name: "Green", color: "#2ecc71" },
  { name: "Blue", color: "#3498db" },
  { name: "Purple", color: "#9b59b6" },
  { name: "Gray", color: "#7f8c8d" },
];

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTag, setSelectedTag] = useState(tagColors[0].color);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = { text: input, done: false, date: new Date(), tag: selectedTag, pinned: false };
    setTasks([...tasks, newTask].sort((a, b) => b.pinned - a.pinned));
    setInput("");
    setSelectedTag(tagColors[0].color);
  };

  const updateTask = () => {
    if (editIndex === null || input.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = { ...updatedTasks[editIndex], text: input, tag: selectedTag };
    setTasks(updatedTasks.sort((a, b) => b.pinned - a.pinned));
    setEditIndex(null);
    setInput("");
  };

  const toggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const togglePin = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].pinned = !updatedTasks[index].pinned;
    setTasks(updatedTasks.sort((a, b) => b.pinned - a.pinned));
  };

  const editTask = (index) => {
    setEditIndex(index);
    setInput(tasks[index].text);
    setSelectedTag(tasks[index].tag);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
    
      {/* Input Section*/}
      <div className="input-wrapper">
        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nugagawen"
            className="task-input"
          />
    
          {/* tag selector */}
          <div className="tag-selector">
            <div className="tag-scroll-container">
              {tagColors.map((tag) => (
                <span
                  key={tag.name}
                  className={`tag-circle ${selectedTag === tag.color ? "selected" : ""}`}
                  style={{ backgroundColor: tag.color }}
                  onClick={() => setSelectedTag(tag.color)}
                ></span>
              ))}
            </div>
          </div>
    
          <button onClick={editIndex !== null ? updateTask : addTask} className="add-btn">
            {editIndex !== null ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    
      {/* task listasd */}
      {tasks.length > 0 && (
        <div className="task-wrapper">
          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <span className="date">{task.date.toLocaleString()}</span>
    
                <div className="task-content">
                  <span className="task-tag" style={{ backgroundColor: task.tag }}></span> {/* dot ot kunware*/}
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(index)}
                    className="checkbox"
                  />
                  <span className={`task-text ${task.done ? "done" : ""}`}>{task.text}</span>
                </div>
    
                <div className="button-group">
                  <button onClick={() => editTask(index)} className="edit-btn">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteTask(index)} className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => togglePin(index)} className="pin-btn" style={{ color: "#1e8449" }}>
                    <Pin size={16} color={task.pinned ? "#1e8449" : "#bdc3c7"} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;


/* CSSssss */
const styles = `
.tag-selector {
  width: 150px;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tag-scroll-container {
  display: flex;
  gap: 8px;
}

.tag-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  flex-shrink: 0; /* Prevent shrinking */
}

.tag-circle.selected {
  border: 2px solid black;
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
