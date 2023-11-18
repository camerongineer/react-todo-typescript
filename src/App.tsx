import React, { useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import AddTodoForm from "./AddTodoForm";
import { loadList } from "./utils/listUtils";
import { initialState, todoReducer } from "./todoReducer";

const App: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    
    useEffect(() => {
        dispatch({ type: "TODO_LIST_FETCH_INIT" });
        const fetchData = async () => {
            const savedData = localStorage.getItem("savedTodoList");
            const parsedData = savedData ? JSON.parse(savedData) : null;
            const result = await new Promise<{ data: { todoList: TodoItem[] } }>(resolve => {
                setTimeout(() => {
                    resolve({ data: { todoList: loadList(parsedData) ?? [] } });
                }, 1000);
            });
            dispatch({ type: "TODO_LIST_FETCH_SUCCESS", payload: result.data.todoList });
        };
        fetchData().catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
        if (!state.isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(state.todoList));
        }
    }, [state.isLoading, state.todoList]);
    
    const addTodo = (newTodo: TodoItem) => dispatch({ type: "ADD_TODO", payload: newTodo });
    const removeTodo = (todoItemId: number) => dispatch({ type: "REMOVE_TODO", payload: todoItemId });
    
    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            {state.isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={state.todoList} onRemoveTodo={removeTodo}/>
            )}
        </>
    );
};

export default App;