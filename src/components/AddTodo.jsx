import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddTodo = ({ getTodo, postTodo, putTodo, todoToEdit, clearTodoToEdit }) => {
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    description: "",
    priority: "",
    isDone: "",
  });

  useEffect(() => {
    if (todoToEdit) {
      setTodoInfo({
        title: todoToEdit.title,
        description: todoToEdit.description,
        priority: todoToEdit.priority,
        isDone: todoToEdit.isDone,
      });
    }
  }, [todoToEdit]);

  const handleChange = (e) => {
    setTodoInfo({ ...todoInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoToEdit) {
      putTodo(todoToEdit.id, todoInfo);
    } else {
      postTodo(todoInfo);
    }
    getTodo();
    handleClose();
  };

  const handleClose = () => {
    setTodoInfo({
      title: "",
      description: "",
      priority: "",
      isDone: "",
    });
    clearTodoToEdit();
  };

  return (
    <div className="mt-5 mb-2">
      <h1 className="text-center mb-4">Todo App</h1>
      <Box
        width={"360px"}
        margin={"auto"}
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap="1rem"
      >
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          value={todoInfo.title}
          onChange={handleChange}
          required
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          value={todoInfo.description}
          onChange={handleChange}
          required
        />
        <FormControl variant="outlined" required>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            name="priority"
            value={todoInfo.priority}
            onChange={handleChange}
            label="Priority"
          >
            <MenuItem value={1}>High</MenuItem>
            <MenuItem value={0}>Normal</MenuItem>
            <MenuItem value={-1}>Low</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" color="success">
          {todoToEdit ? "Update Todo" : "Add Todo"}
        </Button>
      </Box>
    </div>
  );
};

export default AddTodo;
