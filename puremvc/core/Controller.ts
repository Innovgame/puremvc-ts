import {
    ICommand,
    IController,
    INotification,
    IView,
    IContructor,
} from '../interfaces';
import { Observer } from '../pattern';
import { View } from './View';

export class Controller implements IController {
    protected commandMap: { [key: string]: IContructor<ICommand> };
    protected view: IView;
    protected multitionKey: string;

    protected static instanceMap: { [key: string]: IController } = {};
    protected static MULTITON_MSG: string =
        'Controller instance for this multiton key already constructed!';

    constructor(key: string) {
        if (Controller.instanceMap[key]) {
            throw Error(Controller.MULTITON_MSG);
        }

        Controller.instanceMap[key] = this;

        this.commandMap = {};
        this.multitionKey = key;
        this.view = View.getInstance(this.multitionKey);
        this.initializeController();
    }

    private initializeController(): void {
        // TODO:
    }

    executeCommand(notification: INotification): void {
        const cmdName = notification.getName();
        const commandClassRef = this.commandMap[cmdName];

        if (commandClassRef) {
            const command: ICommand = new commandClassRef();
            command.initializeNotifier(this.multitionKey);
            command.execute(notification);
        }
    }
    registerCommand(
        notificationName: string,
        commandClassRef: IContructor<ICommand>
    ): void {
        if (!this.commandMap[notificationName]) {
            this.view?.registerObserver(
                notificationName,
                new Observer(this.executeCommand, this)
            );
        }

        this.commandMap[notificationName] = commandClassRef;
    }
    hasCommand(notificationName: string): boolean {
        return !!this.commandMap[notificationName];
    }
    removeCommand(notificationName: string): void {
        throw new Error('Method not implemented.');
    }

    static getInstance(key: string): IController {
        if (!Controller.instanceMap[key]) {
            Controller.instanceMap[key] = new Controller(key);
        }

        return Controller.instanceMap[key];
    }

    static removeController(key: string) {
        delete Controller.instanceMap[key];
    }
}
