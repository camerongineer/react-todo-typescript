import { TodoItem } from "./models/TodoItem";

const initialState: TodoState = {
    todoList: [],
    isLoading: true
};

interface TodoState {
    todoList: TodoItem[];
    isLoading: boolean;
}

interface InitTodoListAction {
    type: "TODO_LIST_FETCH_INIT";
}

interface TodoListLoadedAction {
    type: "TODO_LIST_FETCH_SUCCESS";
    payload: TodoItem[];
}

interface AddTodoAction {
    type: "ADD_TODO";
    payload: TodoItem;
}

interface RemoveTodoAction {
    type: "REMOVE_TODO";
    payload: number;
}

type Action = InitTodoListAction | TodoListLoadedAction | AddTodoAction | RemoveTodoAction;

const todoReducer = (state: TodoState, action: Action) => {
    switch (action.type) {
        case "TODO_LIST_FETCH_INIT":
            return { ...state, isLoading: true };
        case "TODO_LIST_FETCH_SUCCESS":
            return { ...state, todoList: action.payload, isLoading: false };
        case "ADD_TODO":
            return { ...state, todoList: [...state.todoList, action.payload] };
        case "REMOVE_TODO":
            const newTodoList = state.todoList.filter(todo => todo.id !== action.payload);
            return { ...state, todoList: newTodoList };
        default:
            throw new Error("Invalid Todo Action");
    }
};

export {
    todoReducer,
    initialState
};