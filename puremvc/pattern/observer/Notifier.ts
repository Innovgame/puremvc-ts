import { IFacade, INotifier } from '../../interfaces';
import { Facade } from '../Facade';

export class Notifier implements INotifier {
    protected multitionKey: string = 'Notifier';

    static MULTITON_MSG: string =
        'multitonKey for this Notifier not yet initialized!';

    initializeNotifier(key: string): void {
        this.multitionKey = key;
    }
    sendNotification(name: string, body?: any, type?: string): void {
        this.facade && this.facade.sendNotification(name, body, type);
    }

    get facade(): IFacade {
        if (this.multitionKey === null) {
            throw new Error(Notifier.MULTITON_MSG);
        }
        return Facade.getInstance(this.multitionKey);
    }
}
