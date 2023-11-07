export class TodoItem {
    private static todoID: number = 0;
    private readonly _id: number;
    private _title: string;
    
    constructor (
        title: string,
        id?: number
    ) {
        this._title = title;
        this._id = id ? id : Date.now() - (++TodoItem.todoID * 10);
    }
    
    get id (): number {
        return this._id;
    }
    
    get title (): string {
        return this._title;
    }
    
    set title (value: string) {
        this._title = value;
    }
}