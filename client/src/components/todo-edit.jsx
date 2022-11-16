import { useState } from "react";

const TodoEdit = ({ todo_item }) => {
  const [description, set_description] = useState(todo_item.description);

  const edit_description_of = async (todo_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/todo_item/${todo_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...todo_item, description }),
        }
      );
      if (response.status === 200) window.location = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#edit-todo-modal-id${todo_item.todo_id}`}
      >
        alter
      </button>

      <div
        id={`edit-todo-modal-id${todo_item.todo_id}`}
        className="modal"
        aria-hidden="true"
        aria-labelledby="edit-todo-modal-label"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="edit-todo-modal-label">
                Editing todo_item id: {todo_item.todo_id}
              </h1>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => set_description(todo_item.description)}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => set_description(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              {/* Close modal button, save data button */}
              <div
                className="btn-group"
                role="group"
                aria-label="Close modal or save data buttons"
              >
                <button
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => set_description(todo_item.description)}
                >
                  Close
                </button>
                <button
                  className="btn btn-outline-primary btn-success"
                  style={{ color: "white" }}
                  onClick={() => edit_description_of(todo_item.todo_id)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoEdit;
