import { IMediator, INotification } from '../interfaces';
import { Notifier } from './observer';

export class Mediator extends Notifier implements IMediator {
    protected static NAME = 'Mediator';

    protected mediatorName: string;
    protected viewComponent: any;

    constructor(mediatorName: string | null = null, viewComponent: any = null) {
        super();

        this.mediatorName = mediatorName || Mediator.NAME;

        if (viewComponent) {
            this.setViewComponent(viewComponent);
        }
    }
    getMediatorName(): string {
        return this.mediatorName;
    }
    getViewComponent(): any {
        return this.viewComponent;
    }
    setViewComponent(viewComponent: any): void {
        this.viewComponent = viewComponent;
    }
    listNotificationInterests(): string[] {
        return [];
    }
    handleNotification(notification: INotification): void {}
    onRegister(): void {}
    onRemove(): void {}
}
