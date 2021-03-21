import { ICommand, INotification, IContructor } from '../../interfaces';
import { Notifier } from '../observer';

export class MacroCommand extends Notifier implements ICommand {
    subCommands: IContructor<ICommand>[] = [];

    constructor() {
        super();
        this.initializeMacroCommand();
    }

    initializeMacroCommand(): void {}

    addCommand(commandClassRef: IContructor<ICommand>): void {
        this.subCommands.push(commandClassRef);
    }

    execute(notification: INotification): void {
        this.subCommands.forEach((commandClassRef) => {
            const command = new commandClassRef();
            command.initializeNotifier(this.multitionKey);

            command.execute(notification);
        });
    }
}
