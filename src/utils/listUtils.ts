import { TodoItem } from "../models/TodoItem";

export const loadList = (loadedData: object[] | null): TodoItem[] => {
    if (loadedData === null) {
        return [];
    }
    const todoList: TodoItem[] = [];
    loadedData.forEach((obj: any) => {
        if (obj.hasOwnProperty("fields")) {
            todoList.push(new TodoItem(obj["fields"]["title"], obj["id"]));
        } else {
            return [];
        }
    });
    return todoList;
}
