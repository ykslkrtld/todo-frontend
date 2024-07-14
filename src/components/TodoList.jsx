import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = ({ todos, delTodo, putTodo, setTodoToEdit }) => {

  const handleToggleDone = (id, isDone) => {
    putTodo(id, { isDone: !isDone });
  };

  const handleEditClick = (todo) => {
    setTodoToEdit(todo);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center my-4">Todos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '5%', textAlign: "center" }}>#</th>
            <th style={{ width: '25%' }}>Title</th>
            <th style={{ width: '50%' }}>Description</th>
            <th style={{ width: '20%', textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, index) => (
            <tr key={item.id} className={item.priority === -1 ? "table-danger" : item.priority === 0 ? "table-warning" : "table-success"}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td className={item.isDone ? "text-decoration-line-through" : ""}>{item.title}</td>
              <td className={item.isDone ? "text-decoration-line-through" : ""}>{item.description}</td>
              <td style={{ textAlign: "center" }}>
                <Button variant="success" className="mx-1" onClick={() => handleToggleDone(item.id, item.isDone)}>
                  <i className={`fa-solid fa-check `}></i>
                </Button>
                <Button variant="warning" className="mx-1" onClick={() => handleEditClick(item)}>
                  <i className="fa-solid fa-pen"></i>
                </Button>
                <Button variant="danger" className="mx-1" onClick={() => delTodo(item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
