import * as Interfaces from '../../interfaces/action-permission/action-permission';
import { ModelBase } from '../base/model-base';

export class ActionPermission extends ModelBase implements Interfaces.ActionPermission {
  public controllerName: string;
  public actionName: string;
  public url: string;
}
