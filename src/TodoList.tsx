import React from "react";
import { TodoItem } from "./models/TodoItem";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
    todoList: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todoList }) => (
    <ul>
        {todoList.map(item => <TodoListItem key={item.id} todoItem={item}/>)}
    </ul>
);

export default TodoList;