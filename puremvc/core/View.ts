import { IMediator } from '../interfaces/IMediator';
import { INotification } from '../interfaces/INotification';
import { IObserver } from '../interfaces/IObserver';
import { IView } from '../interfaces/IView';
import { Observer } from '../pattern';

export class View implements IView {
    protected observerMap: { [key: string]: IObserver[] };
    protected mediatorMap: { [key: string]: IMediator };

    protected multitionKey: string;

    protected static instanceMap: { [key: string]: IView } = {};
    protected static MULTITON_MSG: string =
        'View instance for this multiton key already constructed!';

    constructor(key: string) {
        if (View.instanceMap[key]) {
            throw Error(View.MULTITON_MSG);
        }

        View.instanceMap[key] = this;

        this.multitionKey = key;
        this.observerMap = {};
        this.mediatorMap = {};
        this.initializeView();
    }

    protected initializeView(): void {
        // TODO:
    }

    registerObserver(notificationName: string, observer: IObserver): void {
        const observers = this.observerMap[notificationName];

        if (observers) {
            observers.push(observer);
        } else {
            this.observerMap[notificationName] = [observer];
        }
    }
    removeObserver(notificationName: string, notifyContext: any): void {
        const observers = this.observerMap[notificationName];

        let i = observers?.length || 0;

        while (i--) {
            const observer = observers[i];
            if (observer.compareNotifyContext(notifyContext)) {
                observers.splice(i, 1);
                break;
            }
        }

        if (observers.length === 0) {
            delete this.observerMap[notificationName];
        }
    }
    notifyObservers(notification: INotification): void {
        const notificationName = notification.getName();
        const observers = this.observerMap[notificationName];
        if (observers) {
            observers.forEach((observer) => {
                observer.notifyObserver(notification);
            });
        }
    }
    registerMediator(mediator: IMediator): void {
        const mediatorName = mediator.getMediatorName();
        if (this.mediatorMap[mediatorName]) {
            return;
        }

        const interests = mediator.listNotificationInterests();
        this.mediatorMap[mediatorName] = mediator;
        mediator.initializeNotifier(this.multitionKey);
        const observer = new Observer(mediator.handleNotification, mediator);
        interests.forEach((interest) => {
            this.registerObserver(interest, observer);
        });
        mediator.onRegister();
    }
    retrieveMediator(mediatorName: string): IMediator | null {
        return this.mediatorMap[mediatorName] || null;
    }
    removeMediator(mediatorName: string): IMediator | null {
        const mediator = this.mediatorMap[mediatorName];
        if (!mediator) {
            return null;
        }

        const interests = mediator.listNotificationInterests();
        let i = interests?.length || 0;

        while (i--) {
            this.removeObserver(interests[i], mediator);
        }

        delete this.mediatorMap[mediatorName];

        mediator.onRemove();
        return mediator;
    }
    hasMediator(mediatorName: string): boolean {
        return !!this.retrieveMediator(mediatorName);
    }

    static getInstance(key: string): IView {
        if (!View.instanceMap[key]) {
            View.instanceMap[key] = new View(key);
        }

        return View.instanceMap[key];
    }

    static removeView(key: string): void {
        delete View.instanceMap[key];
    }
}
