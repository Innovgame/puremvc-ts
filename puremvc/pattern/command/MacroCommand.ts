import { ICommand, INotification } from '../../interfaces';
import { Notifier } from '../observer';

export class MacroCommand extends Notifier implements ICommand {
    subCommands: { new (): any }[] = [];

    constructor() {
        super();
        this.initializeMacroCommand();
    }

    initializeMacroCommand(): void {}

    addCommand(commandClassRef: { new (): any }): void {
        this.subCommands.push(commandClassRef);
    }

    excute(notification: INotification): void {
        this.subCommands.forEach((commandClassRef) => {
            const command = new commandClassRef() as ICommand;
            command.initializeNotifier(this.multitionKey);

            command.excute(notification);
        });
    }
}
