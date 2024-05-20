import { IFunctionCall } from "../ai/openai-message-handler";
import { Action } from "./actions";
import { IMainController } from "./main";

export abstract class MessageHandler {
  main: IMainController;

  constructor(main: IMainController) {
    this.main = main;
  }

  getActionsFromMessage(message: any): IFunctionCall[] | undefined {
    return [];
  }

  handleAction(actionObj: IFunctionCall) {
    const action = Action.createFrom(actionObj);
    this.main.handle(action);
  }

  handleMessage(message: any) {
    const actions = this.getActionsFromMessage(message);
    if (!actions) return;
    for (const action of actions) {
      this.handleAction(action);
    }
  }
}
