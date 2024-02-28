import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedToDos, setCompletedToDos] = useState([]);

  // Function Handel Add To Do
  const handleAddToDo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    // Update AllToDos Array
    let updatedArray = [...allTodos];
    updatedArray.push(newTodoItem);
    setAllTodos(updatedArray);
    localStorage.setItem("todolist", JSON.stringify(updatedArray));
    // Empty previos title and description
    setNewTitle("");
    setNewDescription("");
  };

  // Use Effect

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDo = JSON.parse(localStorage.getItem("completedTodos"));
    // chech if item exits
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    // check if savedcompleted item exits
    if (savedCompletedToDo) {
      setCompletedToDos(savedCompletedToDo);
    }
  }, []);

  // Function Handel Delete To Do
  const handleDeletToDo = (index) => {
    let reducedToDos = [...allTodos];
    reducedToDos.splice(index,1);
    localStorage.setItem("todolist", JSON.stringify(reducedToDos));
    setAllTodos(reducedToDos);
  };

  // Function Handel Completed Delete
  const handeleCompletedDeleteTodo = (index) => {
    let reducedCompletedToDos = [...completedToDos];
    reducedCompletedToDos.splice(index, 1);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedToDos)
    );
    setCompletedToDos(reducedCompletedToDos);
  };

  // Function Add Completed To Do
  const handelCompletedTodos = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyy = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let completedOn =
      dd +
      "-" +
      mm +
      "-" +
      yyy +
      " at " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn: completedOn,
    };

    let updatedCompletedArray = [...completedToDos];
    updatedCompletedArray.push(filteredItem);
    setCompletedToDos(updatedCompletedArray);
    handleDeletToDo(index);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedArray)
    );
  };

  return (
    <div className="App">
      <h1>my todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          {/* Start todo input item */}
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              placeholder="what is your title of your to do?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          {/* End todo input item */}

          {/* Start todo input item */}
          <div className="todo-input-item">
            <label>description:</label>
            <input
              type="text"
              placeholder="what is your description of your to do?"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          {/* End todo input item */}
          {/* Start todo input item */}
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddToDo}
            >
              Add
            </button>
          </div>
          {/* End todo input item */}
        </div>

        {/* Start btn area */}
        <div className="btn-area">
          <button
            className={`secandery-btn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`secandery-btn ${
              isCompletedScreen === true && "active"
            }`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        {/* End btn area */}
        {/* Start to do list  */}

        <div className="todo-list">
          {/* Start Title & Description For To Do */}
          {isCompletedScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  {/* End Title & Description for To Do */}

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => handleDeletToDo(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      title="Complete?"
                      onClick={() => handelCompletedTodos(index)}
                    />
                  </div>
                </div>
              );
            })}

          {/* IscompletedScreen==true */}
          {isCompletedScreen === true &&
            completedToDos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3 className="complete-title">{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <i>{`Completed at: ${item.CompletedOn}`}</i>
                    </p>
                  </div>
                  {/* End Title & Description for To Do */}

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => handeleCompletedDeleteTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
          {/* End to do list-item */}
        </div>
        {/* End to do list  */}
      </div>
    </div>
  );
}

export default App;
