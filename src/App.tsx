import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import AddTodoForm from "./AddTodoForm";
import { loadList } from "./utils/listUtils";

const App: React.FC = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const savedData = localStorage.getItem("savedTodoList");
            const parsedData = savedData ? JSON.parse(savedData) : null;
            const result = await new Promise<{ data: { todoList: TodoItem[] } }>(resolve => {
                setTimeout(() => {
                    resolve({ data: { todoList: loadList(parsedData) ?? [] } });
                }, 1000);
            });
            setTodoList(result.data.todoList);
            setIsLoading(false);
        };
        fetchData().catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [isLoading, todoList]);
    
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