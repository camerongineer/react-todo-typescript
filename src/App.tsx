import React, { useState } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import { buildList } from "./utils/listUtils";
import { LIST_TITLES } from "./data/data";
import AddTodoForm from "./AddTodoForm";

const App: React.FC = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>(buildList(LIST_TITLES));
    
    const addTodo = (newTodo: TodoItem) => setTodoList([...todoList, newTodo])
    
    return (
        <div>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            <TodoList todoList={todoList}/>
        </div>
    );
};

export default App;