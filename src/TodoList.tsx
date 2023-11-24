import React from "react";
import { TodoItem } from "./models/TodoItem";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
    todoList: TodoItem[];
    onRemoveTodo: (todoItemId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, onRemoveTodo }) => (
    <ul>
        {todoList.map(item => <TodoListItem key={item.id} todoItem={item} onRemoveClicked={onRemoveTodo}/>)}
    </ul>
);

export default TodoList;