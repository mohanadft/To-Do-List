import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [nOfTasks, setNOfTasks] = React.useState(
    parseInt(localStorage.getItem("Number of Tasks")) || 1
  );

  const [state, setState] = React.useState("");

  React.useEffect(
    function () {
      localStorage.setItem("Number of Tasks", nOfTasks);

      setTasks((prevTasks) => {
        return prevTasks.map((e, index) => {
          return { ...e, id: index + 1 };
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [nOfTasks]
  );

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  function deleteTask(name) {
    setNOfTasks((prev) => prev - 1);

    setTasks((prevTasks) => {
      return prevTasks.filter((e) => e.name !== name);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const [prevState, setPrevState] = React.useState("");

  function edit(event) {
    document.querySelector(".add-tasks input").focus();
    setPrevState(
      event.target.parentElement.parentElement.parentElement.querySelector(
        ".task-name"
      ).textContent
    );
    setState(
      event.target.parentElement.parentElement.parentElement.querySelector(
        ".task-name"
      ).textContent
    );
    event.target.parentElement.parentElement.parentElement.querySelector(
      ".edit-content"
    ).style.display = "block";
  }

  function editContent(event, name) {
    setTasks((prevTasks) => {
      return prevTasks.map((e) => {
        return e.name === prevState ? { ...e, name: state } : e;
      });
    });

    name = state;
    event.target.style.display = "none";
    setState("");
  }

  return (
    <div className="container">
      <h1 className="header-app">Todo App</h1>
      <div className="add-tasks">
        <input
          type="text"
          placeholder="Enter Task"
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
        <button
          className="add-btn"
          onClick={(event) => {
            if (event.target.parentElement.children[0].value) {
              setNOfTasks((prev) => prev + 1);

              setTasks((prev) => {
                return [
                  ...prev,
                  {
                    id: nOfTasks,
                    name: event.target.parentElement.children[0].value,
                  },
                ];
              });
              setState("");
            }
          }}
        >
          Add
        </button>
      </div>
      <div className="tasks">
        <ul className="tasks-list">
          {tasks.map(
            (task) =>
              task.name && (
                <li id={task.id} key={task.id} className="task">
                  <div className="content">
                    {task.id}. <span className="task-name">{task.name}</span>
                  </div>
                  <button
                    className="edit-content"
                    onClick={(event) => editContent(event, task.name)}
                  >
                    Edit
                  </button>
                  <div className="btns">
                    <button className="edit" onClick={edit}>
                      <i className="bx bxs-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteTask(task.name)}
                      className="delete"
                    >
                      <i className="bx bx-x-circle"></i>
                    </button>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
