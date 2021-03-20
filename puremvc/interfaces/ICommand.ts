import { INotification } from './INotification';
import { INotifier } from './INotifier';

export interface ICommand extends INotifier, Function {
    new (): ICommand;
    excute(notification: INotification): void;
}
