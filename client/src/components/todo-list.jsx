import { useEffect, useState } from "react";
import TodoEdit from "./todo-edit";
import "./todo-list.css";

const BasicTable = ({ list, delete_todo_item }) => {
  return (
    <div id="basic-table">
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Description</th>
            <th>Important</th>
            <th>More Info</th>
            <th>Tags</th>
            <th>Edit</th>
          </tr>
        </thead>

        {/* Actual table data */}
        <tbody>
          {list.map((todo_item) => {
            return (
              <tr key={todo_item.todo_id}>
                <td>{todo_item.description}</td>
                <td>{`${todo_item.important}`}</td>
                <td>{todo_item.more_info}</td>
                <td>
                  <div className="d-flex flex-row flex-wrap">
                    {todo_item.tags
                      ? todo_item.tags.map((tag, idx) => {
                          return (
                            <div
                              key={`todo=${todo_item.todo_id} :: tag=${todo_item.tags[idx]}`}
                              className="border border-primary"
                              style={{
                                margin: "1px",
                                padding: "5px",
                                width: "fit-content",
                                fontSize: "10px",
                                borderRadius: ".375rem",
                              }}
                            >
                              {tag ? tag : "empty tag"}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </td>

                {/* Edit todo_item button, delete todo_item button */}
                <td>
                  <div
                    id="edit-buttons"
                    className="btn-group"
                    style={{ margin: "1px" }}
                    role="group"
                    aria-label="Edit and delete buttons"
                  >
                    <TodoEdit todo_item={todo_item} />
                    <button
                      className="btn btn-danger"
                      onClick={() => delete_todo_item(todo_item.todo_id)}
                    >
                      destroy
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TodoList = () => {
  const [list, set_list] = useState([]);

  const get_todo_list = async () => {
    try {
      const response = await fetch("http://localhost:5000/all");
      const todo_list_array = await response.json();
      if (response) set_list(todo_list_array);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    get_todo_list();
  }, []);

  const delete_todo_item = async (todo_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/todo_item/${todo_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        set_list(list.filter((todo_item) => todo_item.todo_id !== todo_id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mt-5">
        <h3>Your List</h3>
        <BasicTable list={list} delete_todo_item={delete_todo_item} />
      </div>
    </>
  );
};

export default TodoList;
