import React from "react";
import { TodoItem } from "./models/TodoItem";

interface TodoListItemProps {
    todoItem: TodoItem;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todoItem }) => <li>{todoItem.title}</li>;

export default TodoListItem;