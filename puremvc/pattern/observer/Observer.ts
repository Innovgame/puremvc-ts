import { INotification, IObserver } from '../../interfaces';

export class Observer implements IObserver {
    private notify: Function | null = null;
    private context: any = null;

    constructor(notifyMethod: Function, notifyContext: any) {
        this.setNotifyMethod(notifyMethod);
        this.setNotifyContext(notifyContext);
    }

    private getNotifyMethod(): Function | null {
        return this.notify;
    }
    setNotifyMethod(notifyMethod: Function): void {
        this.notify = notifyMethod;
    }

    private getNotifyContext(): any {
        return this.context;
    }
    setNotifyContext(notifyContext: any): void {
        this.context = notifyContext;
    }
    notifyObserver(notification: INotification): void {
        const fn = this.getNotifyMethod();
        const context = this.getNotifyContext();
        context && fn && fn.call(context, notification);
    }
    compareNotifyContext(obj: any): boolean {
        return obj === this.getNotifyContext();
    }
}
