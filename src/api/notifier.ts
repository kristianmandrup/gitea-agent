import { ChatCompletion } from "openai/resources";
import { IAIAdapter, OpenAIAdapter } from "../ai/openai-adapter";
import { Action } from "./actions";
import { IMainController } from "./main";
import { ChatCompletionMessage } from "openai-fetch/openai-types/resources";
import { MessageHandler } from "./message-handler";
import { OpenAIMessageHandler } from "../ai/openai-message-handler";

export interface INotifier {
  notify(label: string, data: any): Promise<void>;
  notifyError(label: string, data: any): Promise<void>;
}

export interface INofifierOpts {
  aiAdapter?: IAIAdapter;
  messageHandler?: MessageHandler;
}

export class MainNotifier implements INotifier {
  aiAdapter: IAIAdapter;
  messageHandler: MessageHandler;
  main: IMainController;

  constructor(main: IMainController, opts: INofifierOpts = {}) {
    const { aiAdapter, messageHandler } = opts;
    this.aiAdapter = aiAdapter || this.createAiAdapter();
    this.messageHandler = messageHandler || this.createMessageHandler();
    this.main = main;
  }

  protected createMessageHandler() {
    return new OpenAIMessageHandler(this.main);
  }

  protected createAiAdapter() {
    return new OpenAIAdapter();
  }

  handleMessage(message: any) {
    this.messageHandler.handleMessage(message);
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
