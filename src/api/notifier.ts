import { ChatCompletion } from "openai/resources";
import { IAIAdapter, OpenAIAdapter } from "../ai/openai-adapter";
import { Action } from "./actions";
import { IMainController } from "./main";
import { ChatCompletionMessage } from "openai-fetch/openai-types/resources";

export interface INotifier {
  notify(label: string, data: any): Promise<void>;
  notifyError(label: string, data: any): Promise<void>;
}

export interface IFunctionCall {
  name: string;
  arguments: string;
}

export class MainNotifier implements INotifier {
  aiAdapter: IAIAdapter;
  main: IMainController;

  constructor(main: IMainController, aiAdapter?: IAIAdapter) {
    this.aiAdapter = aiAdapter || this.createAiAdapter();
    this.main = main;
  }

  protected createAiAdapter() {
    return new OpenAIAdapter();
  }

  getActionsFromMessage(message: ChatCompletionMessage) {
    return message.tool_calls?.map((tc) => tc.function);
  }

  handleAction(actionObj: IFunctionCall) {
    const action = Action.createFrom(actionObj);
    this.main.handle(action);
  }

  handleMessage(actionObj: any) {
    const actions = this.getActionsFromMessage(actionObj);
    if (!actions) return;
    for (const action of actions) {
      this.handleAction(action);
    }
  }

  public handleResponse(message: ChatCompletionMessage) {
    try {
      this.handleMessage(message);
    } catch (error) {
      console.log("Not a gitea action");
    }
  }

  async notifyError(label: string, data: any) {
    await this.notify(`ERROR:${label}`, data);
  }

  async notify(label: string, data: any) {
    const message = JSON.stringify(label, data);
    const aiResponse = await this.aiAdapter.notifyAi(message);
    if (this.isToolCall(aiResponse)) {
      this.handleResponse(aiResponse.message);
    }
  }

  isToolCall(aiResponse: ChatCompletion.Choice) {
    return aiResponse.finish_reason == "function_call";
    // return aiResponse.message.tool_calls;
  }
}
