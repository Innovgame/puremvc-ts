import { IMediator } from './IMediator';
import { INotification } from './INotification';
import { IObserver } from './IObserver';

export interface IViewFacade {
    notifyObservers(notification: INotification): void;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator | null;
    removeMediator(mediatorName: string): IMediator | null;
    hasMediator(mediatorName: string): boolean;
}

export interface IView extends IViewFacade {
    registerObserver(notificationName: string, observer: IObserver): void;
    removeObserver(notificationName: string, notifyContext: any): void;
}
