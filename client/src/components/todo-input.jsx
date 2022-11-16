import { useState } from "react";

const TodoInput = () => {
  const [important, set_important] = useState(false);
  const [description, set_description] = useState("");
  const [more_info, set_more_info] = useState("");
  const [tags, set_tags] = useState("");

  const on_submit_form = async (e) => {
    e.preventDefault();
    const tags_array = tags.trim().split(/\s+/);

    try {
      const response = await fetch("http://localhost:5000/todo_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          important,
          more_info,
          tags: tags_array,
        }),
      });
      set_description("");
      set_more_info("");
      set_tags("");
      if (response.status === 200) window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h3 className="text-center my-5">New Todo Item</h3>
      <form
        style={{ width: "600px", margin: "0 auto" }}
        onSubmit={on_submit_form}
      >
        <p className="text-start">Description</p>
        <div className="d-flex">
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
            aria-label="Add and toggle importance buttons"
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
            <p className="text-start">More Info</p>
            <div
              className="text-start"
              style={{
                height: "100px",
                border: "1px solid lightgray",
                padding: "6px 12px",
                borderRadius: ".375rem",
                overflow: "hidden",
              }}
              contentEditable={true}
              onInput={(e) => set_more_info(e.currentTarget.textContent)}
            ></div>
          </div>
        ) : null}

        {/* Tags */}
        {more_info !== "" ? (
          <div
            className="my-3"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="m-0">Add Tags</p>
            <p style={{ fontSize: "smaller" }}>Tags are separated by spaces</p>
            <input
              type="text"
              className="form-control me-1"
              style={{ width: "200px" }}
              value={tags}
              onChange={(e) => set_tags(e.target.value)}
            />
          </div>
        ) : null}
      </form>
    </>
  );
};

export default TodoInput;
