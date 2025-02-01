import axios, { AxiosError } from "axios";
import { getUser } from "./userManager";
const serverUrl = "http://localhost:8081";
import { task } from "../interfaces/interfaces";

export const getTodos = async () => {
  try {
    let user =
      JSON.parse(sessionStorage.getItem("user") as string) || (await getUser());
    if (!user) throw "Not Logged in.";

    const todos = await axios.get(`${serverUrl}/todos`, {
      withCredentials: true,
    });

    return todos.data as task[];
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
};

export const changeTaskState = async (finished: boolean, t_id: number) => {
  try {
    const res = await axios.post(
      `${serverUrl}/changeTodoState`,
      {
        finished,
        t_id,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("Failed to change todo state:", error.response.data);
  }
};

export const removeTodo = async (t_id: number) => {
  try {
    const res = await axios.delete(`${serverUrl}/removeTodo`, {
      data: {
        t_id: t_id,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    console.error(
      `Failed to remove todo of id [${t_id}]:`,
      error.response.data
    );
  }
};
