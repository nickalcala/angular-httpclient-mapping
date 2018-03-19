import { JsonProperty } from "../decorators/json-property";

export class Book {
    private _id: number;
    private _title: string;
    private _description: string;
    private _author: string;
    private _publishedAt: Date;

    public get id(): number {
        return this._id;
    }

    @JsonProperty()
    public set id(value: number) {
        this._id = value;
    }

    public get title(): string {
        return this._title;
    }

    @JsonProperty()
    public set title(value: string) {
        this._title = value;
    }

    public get description(): string {
        return this._description;
    }

    @JsonProperty()
    public set description(value: string) {
        this._description = value;
    }

    public get author(): string {
        return this._author;
    }

    @JsonProperty()
    public set author(value: string) {
        this._author = value;
    }

    public get publishedAt(): Date {
        return this._publishedAt;
    }

    @JsonProperty('published_at')
    public set publishedAt(value: Date) {
        this._publishedAt = value;
    }

}