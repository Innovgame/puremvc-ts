import { IControllerFacade } from './IController';
import { IModelFacade } from './IModel';
import { INotifier } from './INotifier';
import { IViewFacade } from './IView';

export interface IFacade
    extends INotifier,
        IViewFacade,
        IControllerFacade,
        IModelFacade {}
