import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const FORM_ID: string = "todoForm";
const TITLE_ID: string = "todoTitle";

interface AddTodoFormProps {
    onAddTodo: (todoTitle: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState<string>("");
    
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };
    
    const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (todoTitle.trim()) {
            onAddTodo(todoTitle);
        } else {
            alert("Please enter a todo title");
        }
        setTodoTitle("");
    };
    
    return (
        <form id={FORM_ID} onSubmit={handleAddTodo}>
            <InputWithLabel inputId={TITLE_ID}
                            inputValue={todoTitle}
                            isFocused
                            onInputChange={handleTitleChange}>
                <strong>Title:</strong>
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;