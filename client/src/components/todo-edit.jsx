import { useState } from "react";

const TodoEdit = ({ todo_item }) => {
  const [description, set_description] = useState(todo_item.description);

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
        className="modal fade"
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
              ></button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={description} />
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
                >
                  Close
                </button>
                <button
                  className="btn btn-outline-primary btn-success"
                  style={{ color: "white" }}
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
