import { LegacyRef, ReactNode, useEffect, useRef, useState } from "react";
import "../styles/Home.sass";
import { changeTaskState, getTodos, removeTodo } from "../api/taksManager";
import { task } from "../interfaces/interfaces";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";

export const Home = () => {
  const [tasks, setTasks] = useState<task[] | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<{ t_id: number }[]>([]);
  const todoDescWordLength = 20;
  const todosContainerRef = useRef<HTMLDivElement | null>(null);

  const resetCheckboxes = () => {
    if (!todosContainerRef.current) return;

    const todoElements = todosContainerRef.current.children;

    for (let i = 1; i < todoElements.length; i++) {
      const child = todoElements[i];
      const checkbox = child
        .getElementsByClassName("todo-left")[0]
        .getElementsByClassName("todo-checkbox")[0] as HTMLInputElement;

      checkbox.checked = false;
    }
  };

  const fetchTasks = async () => {
    const tasksResponse = await getTodos();
    if (!tasksResponse) return;

    const sortedTasks = tasksResponse.sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    setTasks(sortedTasks as task[]);
    resetCheckboxes();
  };

  useEffect(() => {
    fetchTasks();
  }, [setTasks]);

  const changeTodoState = (finished: boolean) => {
    try {
      new Promise((resolve, reject) => {
        selectedTasks.forEach(async (selectedTask, index) => {
          await changeTaskState(finished, selectedTask.t_id);
          if (index === selectedTasks.length - 1) resolve(true);
        });
      })
        .then(async () => {
          fetchTasks();
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.error("Failed to mark todos as finished:", error);
    }
  };

  const removeTask = () => {
    try {
      new Promise((resolve, reject) => {
        selectedTasks.forEach(async (selectedTask, index) => {
          await removeTodo(selectedTask.t_id);
          if (index == selectedTasks.length - 1) resolve(true);
        });
      })
        .then(async () => {
          fetchTasks();
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.error("Failed to submit changes to task:", error``);
    }
  };

  return (
    <div className="pages home">
      <div className="bottom">
        <div className="today-tasks-container" ref={todosContainerRef}>
          <h1 className="today-tasks-container-title">
            Today
            <div className="today-tasks-actions">
              <IconButton
                className="today-tasks-action"
                onClick={() => changeTodoState(true)}
                icon={<Icon name="check" />}
              />
              <IconButton
                className="today-tasks-action"
                onClick={() => changeTodoState(false)}
                icon={<Icon name="cancel" />}
              />
              <IconButton
                className="today-tasks-action"
                onClick={removeTask}
                icon={<Icon name="trash" />}
              />
            </div>
          </h1>
          {tasks &&
            tasks.map((task, index) => {
              return (
                <button
                  className={`todo ${task.finished ? "finished" : ""}`}
                  key={index}
                  onClick={(e) => {
                    if (e.target.className == "todo-checkbox") return;
                    const parent = e.currentTarget;
                    const expanded = parent.classList.contains("expanded");
                    if (!expanded) {
                      parent.classList.add("expanded");
                    } else {
                      parent.classList.remove("expanded");
                    }

                    const partialDescription = parent.children[1].querySelector(
                      ".partial-description"
                    );

                    const fullDescription =
                      parent.children[1].querySelector(".full-description");

                    switch (!expanded) {
                      case true:
                        partialDescription?.classList.add("hidden");
                        fullDescription?.classList.remove("hidden");
                        break;
                      case false:
                        partialDescription?.classList.remove("hidden");
                        fullDescription?.classList.add("hidden");
                        break;
                    }
                  }}
                >
                  <div className="todo-left">
                    <input
                      type="checkbox"
                      className="todo-checkbox"
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setSelectedTasks((prev) => [
                            ...prev,
                            { t_id: task.t_id },
                          ]);
                        } else {
                          setSelectedTasks((prev) =>
                            prev.filter((taskId) => taskId.t_id !== task.t_id)
                          );
                        }
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <div className="todo-title">{task.title}</div>
                      <div className="todo-info">
                        {new Date(task.start_date).toString().slice(0, 21)}
                        {" - "}
                        {new Date(task.end_date).toString().slice(0, 21)}
                      </div>
                    </div>
                  </div>
                  <div className="todo-desc">
                    <h4>Description</h4>
                    <p className="partial-description">
                      {task.description
                        .split(" ")
                        .filter((word, index) => index + 1 < todoDescWordLength)
                        .join(" ")}
                      {task.description.split(" ").length + 1 >=
                      todoDescWordLength
                        ? "..."
                        : undefined}
                    </p>
                    <p className="full-description hidden">
                      {task.description}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
