import React, { useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import AddTodoForm from "./AddTodoForm";
import { loadList } from "./utils/listUtils";
import { initialState, todoReducer } from "./todoReducer";
import { fetchItems } from "./api";

const App: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    
    useEffect(() => {
        dispatch({ type: "TODO_LIST_FETCH_INIT" });
        const fetchData = async () => {
            const response = await fetchItems();
            const savedData = response.data ? loadList(response.data) : []
            dispatch({ type: "TODO_LIST_FETCH_SUCCESS", payload: savedData });
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