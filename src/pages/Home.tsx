import "../styles/Home.sass";

export const Home = () => {
  const todoDescWordLength = 20;
  const sampleTasks = [
    {
      title: "Do the dishes",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non rhoncus justo. Aliquam vitae vestibulum arcu, vitae gravida lectus. Aenean quis faucibus ex, quis faucibus arcu. Nunc consequat tempor arcu, nec pretium arcu hendrerit pulvinar. Sed vitae pulvinar ligula. Pellentesque ut euismod diam. Ut vel venenatis sem. Nam nec massa ac odio tristique aliquam.",
      start_date: "2025-01-15T08:00",
      end_date: "2025-01-15T09:00",
    },
  ];

  return (
    <div className="pages home">
      <div className="bottom">
        <div className="today-tasks-container">
          <h1 className="today-tasks-container-title">Today</h1>
          {sampleTasks.map((task, index) => {
            return (
              <div className="todo" key={index}>
                <div className="todo-left">
                  <div className="todo-top">
                    <div className="todo-title">{task.title}</div>
                  </div>
                  <div className="todo-info">
                    {new Date(task.start_date).toString().slice(0, 21)}
                    {" - "}
                    {new Date(task.end_date).toString().slice(0, 21)}
                  </div>
                </div>
                <div className="todo-desc">
                  <h4>Description</h4>
                  {task.desc
                    .split(" ")
                    .filter((word, index) => index + 1 < todoDescWordLength)
                    .join(" ")}
                  {task.desc.split(" ").length + 1 >= todoDescWordLength
                    ? "..."
                    : undefined}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
