import { INotification } from '../../interfaces';

export class Notification implements INotification {
    private name: string;
    private body: any;
    private type: string;

    constructor(_name: string, _body: any = null, _type: string = 'any') {
        this.name = _name;
        this.body = _body;
        this.type = _type;
    }

    getName(): string {
        return this.name;
    }
    getBody(): any {
        return this.body;
    }
    setBody(body: any): void {
        this.body = body;
    }
    getType(): string {
        return this.type;
    }
    setType(type: string): void {
        this.type = type;
    }
    toString(): string {
        let msg: string = 'Notification Name: ' + this.getName();
        msg +=
            '\nBody:' +
            (this.getBody() == null ? 'null' : this.getBody().toString());
        msg += '\nType:' + (this.getType() == null ? 'null' : this.getType());
        return msg;
    }
}
