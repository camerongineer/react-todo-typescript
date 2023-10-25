import React, { useState } from "react";
import { TodoItem } from "./models/TodoItem";

const FORM_ID: string = "todoForm";
const TITLE_ID: string = "todoTitle";

interface AddTodoFormProps {
    onAddTodo: (todoTitle: TodoItem) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState<string>("");
    
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };
    
    const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddTodo(new TodoItem(todoTitle, Date.now()));
        setTodoTitle("");
    };
    
    return (
        <form id={FORM_ID} onSubmit={handleAddTodo}>
            <label htmlFor={TITLE_ID}>Title:&nbsp;
                <input id={TITLE_ID} name="title" value={todoTitle} onChange={handleTitleChange}/>
                <button type="submit">Add</button>
            </label>
        </form>
    );
};

export default AddTodoForm;