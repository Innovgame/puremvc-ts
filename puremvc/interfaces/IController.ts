import { ICommand } from './ICommand';
import { IContructor } from './IConstructor';
import { INotification } from './INotification';

export interface IControllerFacade {
    registerCommand(
        notificationName: string,
        commandClassRef: IContructor<ICommand>
    ): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
}

export interface IController extends IControllerFacade {
    executeCommand(notification: INotification): void;
}
