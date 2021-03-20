import { IProxy } from './IProxy';

export interface IModelFacade {
    registerProxy(proxy: IProxy): void;
    removeProxy(proxyName: string): IProxy | null;
    retrieveProxy(proxyName: string): IProxy | null;
    hasProxy(proxyName: string): boolean;
}

export interface IModel extends IModelFacade {}
