import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import AddTodoForm from "./AddTodoForm";
import { loadList } from "./utils/listUtils";

const App: React.FC = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        new Promise(resolve => {
            setTimeout(() => {
                const savedData = localStorage.getItem("savedTodoList");
                const parsedData = savedData ? JSON.parse(savedData) : null;
                resolve({ data: { todoList: loadList(parsedData) ?? [] } });
            }, 1000);
        }).then(result => {
            // @ts-ignore
            setTodoList(result.data.todoList);
            setIsLoading(false);
        });
    }, []);
    
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [todoList]);
    
    const addTodo = (newTodo: TodoItem) => setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    const removeTodo = (todoItemId: number) => setTodoList(
        prevTodoList => prevTodoList.filter(item => item.id !== todoItemId)
    );
    
    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
            )}
        </>
    );
};

export default App;