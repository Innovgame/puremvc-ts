import { INotification } from './INotification';
import { INotifier } from './INotifier';

export interface ICommand extends INotifier, Function {
    excute(notification: INotification): void;
}
