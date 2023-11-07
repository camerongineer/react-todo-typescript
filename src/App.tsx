import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import AddTodoForm from "./AddTodoForm";
import { loadList } from "./utils/listUtils";

const useSemiPersistentState = (
    key: string, initialValue: TodoItem[]): [TodoItem[], Dispatch<SetStateAction<TodoItem[]>>] => {
    const savedData = localStorage.getItem(key);
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const [value, setValue] = useState<TodoItem[]>(loadList(parsedData) || initialValue);
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, parsedData, value]);
    
    return [value, setValue];
};

const App: React.FC = () => {
    const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);
    
    const addTodo = (newTodo: TodoItem) => setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    
    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            <TodoList todoList={todoList}/>
        </>
    );
};

export default App;