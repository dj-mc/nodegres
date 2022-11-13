import { useState } from "react";

const TodoInput = () => {
  const [important, set_important] = useState(false);
  const [description, set_description] = useState("");
  const [more_info, set_more_info] = useState("");

  const on_submit_form = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/todo_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, important, more_info }),
      });

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">New Todo Item</h1>
      <form
        style={{ width: "600px", margin: "0 auto" }}
        onSubmit={on_submit_form}
      >
        <div className="d-flex mx-5">
          {/* Add todo_item input */}
          <input
            type="text"
            className="form-control me-1"
            value={description}
            onChange={(e) => set_description(e.target.value)}
          />

          {/* Add todo_item button, toggle importance button */}
          <div
            className="btn-group"
            role="group"
            aria-label="Add and toggle importance"
          >
            <button
              type="submit"
              className="btn btn-outline-primary btn-success"
              style={{ color: "white" }}
            >
              Add
            </button>
            <input
              type="checkbox"
              id="important-checkbox"
              className="btn-check"
              name="important"
              value={important}
              onChange={() => {
                set_important(!important);
              }}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="important-checkbox"
            >
              Important
            </label>
          </div>
        </div>

        {/* Additional information */}
        {description !== "" ? (
          <div className="my-3">
            <p className="text-center">More Info</p>
            <div
              id="more-info"
              className="mx-5 my-3 rounded-3"
              style={{ height: "100px", border: "1px solid lightgray" }}
              contentEditable={true}
              onInput={(e) => set_more_info(e.currentTarget.textContent)}
            ></div>
          </div>
        ) : null}
      </form>
    </>
  );
};

export default TodoInput;
