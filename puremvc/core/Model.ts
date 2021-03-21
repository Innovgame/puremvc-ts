import { IModel, IProxy } from '../interfaces';

export class Model implements IModel {
    protected proxyMap: { [key: string]: IProxy };
    protected multitionKey: string;

    protected static instanceMap: { [key: string]: IModel } = {};
    protected static MULTITON_MSG: string =
        'Model instance for this multiton key already constructed!';

    constructor(key: string) {
        if (Model.instanceMap[key]) {
            throw new Error(Model.MULTITON_MSG);
        }

        Model.instanceMap[key] = this;
        this.multitionKey = key;
        this.proxyMap = {};
        this.initializeModel();
    }

    static getInstance(key: string): IModel {
        if (!Model.instanceMap[key]) {
            Model.instanceMap[key] = new Model(key);
        }

        return Model.instanceMap[key];
    }

    static removeModel(key: string): void {
        delete Model.instanceMap[key];
    }

    initializeModel(): void {
        // TODO:
    }

    registerProxy(proxy: IProxy): void {
        proxy.initializeNotifier(this.multitionKey);
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    }
    removeProxy(proxyName: string): IProxy | null {
        const proxy = this.proxyMap[proxyName] || null;
        if (proxy) {
            delete this.proxyMap[proxyName];
            proxy.onRemove();
        }
        return proxy;
    }
    retrieveProxy(proxyName: string): IProxy | null {
        const proxy = this.proxyMap[proxyName] || null;
        return proxy;
    }
    hasProxy(proxyName: string): boolean {
        return !!this.retrieveProxy(proxyName);
    }
}
