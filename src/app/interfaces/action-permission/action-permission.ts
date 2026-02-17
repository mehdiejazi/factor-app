import { ModelBase } from '../base/model-base';

export interface ActionPermission extends ModelBase {
  controllerName: string;
  actionName: string;
  url: string;
}
