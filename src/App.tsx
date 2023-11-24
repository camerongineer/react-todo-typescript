import React, { useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { TodoItem } from "./models/TodoItem";
import AddTodoForm from "./AddTodoForm";
import { loadList } from "./utils/listUtils";
import { initialState, todoReducer } from "./todoReducer";
import { addItem, deleteItem, fetchItems } from "./api";

const App: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    
    useEffect(() => {
        dispatch({ type: "TODO_LIST_FETCH_INIT" });
        const fetchData = async () => {
            const response = await fetchItems();
            const savedData = response.data ? loadList(response.data) : [];
            dispatch({ type: "TODO_LIST_FETCH_SUCCESS", payload: savedData });
        };
        fetchData().catch(err => console.error(err));
    }, []);
    
    const addTodo = async (newTodoTitle: string) => {
        try {
            const response = await addItem(newTodoTitle);
            const newTodo = new TodoItem(newTodoTitle, response.data.id);
            dispatch({ type: "ADD_TODO_SUCCESS", payload: newTodo });
        } catch {
            console.error("Something went wrong...");
        }
    };
    const removeTodo = async (todoItemId: string) => {
        try {
            await deleteItem(todoItemId);
            dispatch({ type: "REMOVE_TODO_SUCCESS", payload: todoItemId });
        } catch {
            console.error("Something went wrong...");
        }
        
    };
    
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