import React from "react";
import { TodoItem } from "./models/TodoItem";

interface TodoListItemProps {
    todoItem: TodoItem;
    onRemoveClicked: (todoItemId: string) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todoItem, onRemoveClicked }) =>
    <li>
        <div style={{ display: "flex", margin: "4px 20px 4px 0", justifyContent: "space-between" }}>
            {todoItem.title}
            <button onClick={() => onRemoveClicked(todoItem.id)}>Remove</button>
        </div>
    </li>;

export default TodoListItem;