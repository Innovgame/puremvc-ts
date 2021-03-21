import { INotification } from './INotification';
import { INotifier } from './INotifier';

export interface ICommandContructor {
    new (...params: any): ICommand;
}

export interface ICommand extends INotifier {
    excute(notification: INotification): void;
}
