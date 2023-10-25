import {TodoItem} from "../models/TodoItem";
export const buildList = (listItems: string[]): TodoItem[] => listItems.map(item => (new TodoItem(item)));