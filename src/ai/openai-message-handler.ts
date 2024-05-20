import { ChatCompletionMessage } from "openai/resources";
import { MessageHandler } from "../api/message-handler";

export interface IFunctionCall {
  name: string;
  arguments: string;
}

export class OpenAIMessageHandler extends MessageHandler {
  getActionsFromMessage(message: any): IFunctionCall[] | undefined {
    return (message as ChatCompletionMessage).tool_calls?.map(
      (tc) => tc.function
    );
  }

  async handleMessage(message: any) {
    const actions = this.getActionsFromMessage(message);
    if (!actions) return;
    for (const action of actions) {
      await this.handleAction(action);
    }
  }
}
