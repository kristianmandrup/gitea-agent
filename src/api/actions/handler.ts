import { IMainController } from "../main";
import { Action } from "./action";

export type ActionHandlerType = "composite" | "leaf";

export type ActionHandlerFactoryFn = (main: IMainController) => IActionHandler;

export interface IActionHandler {
  name: string;
  type: ActionHandlerType;
  definition: any;

  handle(action: Action): Promise<void>;
  notifyError(label: string, data: any): void;
  notify(label: string, data: any): void;
}
