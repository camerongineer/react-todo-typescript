export class TodoItem {
    private readonly _id: string;
    private _title: string;
    
    constructor (
        title: string,
        id: string
    ) {
        this._title = title;
        this._id = id;
    }
    
    get id (): string {
        return this._id;
    }
    
    get title (): string {
        return this._title;
    }
    
    set title (value: string) {
        this._title = value;
    }
}