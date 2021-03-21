import { ICommandContructor } from './ICommand';
import { INotification } from './INotification';

export interface IControllerFacade {
    registerCommand(
        notificationName: string,
        commandClassRef: ICommandContructor
    ): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
}

export interface IController extends IControllerFacade {
    executeCommand(notification: INotification): void;
}
