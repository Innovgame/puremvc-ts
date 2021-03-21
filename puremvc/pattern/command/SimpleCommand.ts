import { ICommand, INotification } from '../../interfaces';
import { Notifier } from '../observer';

export class SimpleCommand extends Notifier implements ICommand {
    execute(notification: INotification): void {}
}
