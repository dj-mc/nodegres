import { useEffect, useState } from "react";

const BasicTable = ({ list, delete_todo_item }) => {
  return (
    <table className="table">
      {/* Table headers */}
      <thead>
        <tr>
          <th>Description</th>
          <th>Important</th>
          <th>More Info</th>
          <th>Tags</th>
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
                {todo_item.tags
                  ? todo_item.tags.map((tag, idx) => (
                      <div key={idx} className="border border-primary my-1">{tag}</div>
                    ))
                  : null}
              </td>

              {/* Edit and delete button group */}
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Edit and delete buttons"
                >
                  <button className="btn btn-outline-primary">alter</button>
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
      if (response.status === 200) window.location.reload();
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
