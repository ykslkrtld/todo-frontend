import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import axios from 'axios';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const getTodo = async () => {
    try {
      const res = await axios(process.env.BASE_URL);
      console.log(res.data.result.rows);
      setTodos(res.data.result.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const delTodo = async (id) => {
    try {
      await axios.delete(`${process.env.BASE_URL}/${id}`);
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const postTodo = async (data) => {
    try {
      await axios.post(process.env.BASE_URL, data);
      getTodo();
    } catch (error) {
      console.error(error);
    }
  };

  const putTodo = async (id, data) => {
    try {
      await axios.put(`${process.env.BASE_URL}/${id}`, data);
      getTodo();
    } catch (error) {
      console.error(error);
    }
  };

  const clearTodoToEdit = () => {
    setTodoToEdit(null);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <AddTodo
        getTodo={getTodo}
        postTodo={postTodo}
        putTodo={putTodo}
        todoToEdit={todoToEdit}
        clearTodoToEdit={clearTodoToEdit}
      />
      <TodoList
        delTodo={delTodo}
        todos={todos}
        putTodo={putTodo}
        setTodoToEdit={setTodoToEdit}
      />
    </div>
  );
};

export default Home;
