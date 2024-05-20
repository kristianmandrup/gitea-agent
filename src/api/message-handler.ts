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

  async handleAction(actionObj: IFunctionCall) {
    const action = Action.createFrom(actionObj);
    await this.main.handle(action);
  }

  async handleMessage(message: any) {
    const actions = this.getActionsFromMessage(message);
    if (!actions) return;
    for (const action of actions) {
      await this.handleAction(action);
    }
  }
}
