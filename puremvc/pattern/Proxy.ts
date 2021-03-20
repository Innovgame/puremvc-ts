import { IProxy } from '../interfaces';
import { Notifier } from './observer';

export class Proxy extends Notifier implements IProxy {
    protected proxyName: string;
    protected data: any;

    protected static NAME: string = 'Proxy';
    constructor(proxyName: string | null = null, data = null) {
        super();

        this.proxyName = proxyName || Proxy.NAME;
        if (data) {
            this.setData(data);
        }
    }

    getProxyName(): string {
        return this.proxyName;
    }
    setData(data: any): void {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    onRegister(): void {}
    onRemove(): void {}
}
