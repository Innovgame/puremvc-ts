import { INotification } from './INotification';
import { INotifier } from './INotifier';

export interface ICommand extends INotifier {
    excute(notification: INotification): void;
}
