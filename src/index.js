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


  React.useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("Number of Tasks", nOfTasks);

      setTasks((prevTasks) => {
        return prevTasks.map((e, index) => {
          e.id = index + 1;
          return e;
        });
      });
    },
    [nOfTasks]
  );

  return (
    <div className="container">
      <h1 className="header-app">Todo App</h1>
      <div className="add-tasks">
        <input type="text" placeholder="Enter Task" />
        <button
          className="add-btn"
          onClick={(event) => {
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
                    onClick={(event) => {
                      const clickedItemContent =
                        event.target.parentElement.parentElement.querySelector(
                          ".task-name"
                        ).textContent;

                      setNOfTasks((prev) => prev - 1);

                      setTasks((prevTasks) => {
                        return prevTasks.filter(
                          (e) => e.name !== clickedItemContent
                        );
                      });
                    }}
                  >
                    <i className="bx bx-x-circle"></i>
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
