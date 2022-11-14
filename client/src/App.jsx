import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <h1>nodegres</h1>
        <p>A todo list app built using the PERN stack</p>
        <TodoInput />
        <TodoList />
      </div>
    </>
  );
}

export default App;
