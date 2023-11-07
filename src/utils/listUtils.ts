import { TodoItem } from "../models/TodoItem";

export const loadList = (loadedData: object[] | null): TodoItem[] | null => {
    if (loadedData === null) {
        return null;
    }
    const todoList: TodoItem[] = [];
    loadedData.forEach((obj: any) => {
        if (obj.hasOwnProperty("_title")) {
            todoList.push(new TodoItem(obj["_title"], obj["_id"]));
        } else {
            return null;
        }
    });
    return todoList;
}
