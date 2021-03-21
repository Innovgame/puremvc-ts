import { Controller, Model, View } from '../core';
import {
    ICommand,
    IContructor,
    IController,
    IFacade,
    IMediator,
    IModel,
    INotification,
    IProxy,
    IView,
} from '../interfaces';
import { Notification } from './observer';

export class Facade implements IFacade {
    protected model: IModel | null = null;
    protected view: IView | null = null;
    protected controller: IController | null = null;

    protected multitionKey: string;

    protected static instanceMap: { [key: string]: IFacade } = {};
    protected static MULTITON_MSG: string =
        'Facade instance for this multiton key already constructed!';

    constructor(key: string) {
        if (Facade.instanceMap[key]) {
            throw new Error(Facade.MULTITON_MSG);
        }

        this.multitionKey = key;
        this.initializeNotifier(key);
        Facade.instanceMap[key] = this;
        this.initializeFacade();
    }

    initializeNotifier(key: string): void {
        // TODO: ...
    }
    sendNotification(name: string, body?: any, type?: string): void {
        this.notifyObservers(new Notification(name, body, type));
    }

    initializeFacade(): void {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    }

    initializeModel(): void {
        if (!this.model) {
            this.model = Model.getInstance(this.multitionKey);
        }
    }
    initializeController(): void {
        if (!this.controller) {
            this.controller = Controller.getInstance(this.multitionKey);
        }
    }
    initializeView(): void {
        if (!this.view) {
            this.view = View.getInstance(this.multitionKey);
        }
    }

    notifyObservers(notification: INotification): void {
        this.view && this.view.notifyObservers(notification);
    }
    registerMediator(mediator: IMediator): void {
        this.view && this.view.registerMediator(mediator);
    }
    retrieveMediator(mediatorName: string): IMediator | null {
        if (!this.view) {
            return null;
        }
        return this.view.retrieveMediator(mediatorName);
    }
    removeMediator(mediatorName: string): IMediator | null {
        if (!this.view) {
            return null;
        }

        return this.view.removeMediator(mediatorName);
    }
    hasMediator(mediatorName: string): boolean {
        if (!this.view) {
            return false;
        }

        return this.view.hasMediator(mediatorName);
    }

    registerCommand(
        notificationName: string,
        commandClassRef: IContructor<ICommand>
    ): void {
        this.controller &&
            this.controller.registerCommand(notificationName, commandClassRef);
    }
    hasCommand(notificationName: string): boolean {
        if (!this.controller) {
            return false;
        }

        return this.controller.hasCommand(notificationName);
    }
    removeCommand(notificationName: string): void {
        this.controller && this.controller.removeCommand(notificationName);
    }

    registerProxy(proxy: IProxy): void {
        this.model && this.model.registerProxy(proxy);
    }
    removeProxy(proxyName: string): IProxy | null {
        if (!this.model) {
            return null;
        }

        return this.model.removeProxy(proxyName);
    }
    retrieveProxy(proxyName: string): IProxy | null {
        if (!this.model) {
            return null;
        }

        return this.model.retrieveProxy(proxyName);
    }
    hasProxy(proxyName: string): boolean {
        if (!this.model) {
            return false;
        }

        return this.model.hasProxy(proxyName);
    }

    static getInstance(
        key: string,
        facadeClassRef: IContructor<IFacade> = Facade
    ): IFacade {
        if (!Facade.instanceMap[key]) {
            Facade.instanceMap[key] = new facadeClassRef(key);
        }

        return Facade.instanceMap[key];
    }

    static hasCore(key: string) {
        return !!Facade.instanceMap[key];
    }

    static removeCore(key: string) {
        if (!Facade.instanceMap[key]) {
            return;
        }

        Model.removeModel(key);
        Controller.removeController(key);
        View.removeView(key);

        delete Facade.instanceMap[key];
    }
}
