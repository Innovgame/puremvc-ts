export interface INotification {
    getName(): string;

    getBody(): any;

    setBody(body: any): void;

    getType(): string;

    setType(type: string): void;

    toString(): string;
}
