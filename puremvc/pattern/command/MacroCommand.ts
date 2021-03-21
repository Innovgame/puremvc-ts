import { ICommand, INotification, ICommandContructor } from '../../interfaces';
import { Notifier } from '../observer';

export class MacroCommand extends Notifier implements ICommand {
    subCommands: ICommandContructor[] = [];

    constructor() {
        super();
        this.initializeMacroCommand();
    }

    initializeMacroCommand(): void {}

    addCommand(commandClassRef: ICommandContructor): void {
        this.subCommands.push(commandClassRef);
    }

    excute(notification: INotification): void {
        this.subCommands.forEach((commandClassRef) => {
            const command = new commandClassRef();
            command.initializeNotifier(this.multitionKey);

            command.excute(notification);
        });
    }
}
