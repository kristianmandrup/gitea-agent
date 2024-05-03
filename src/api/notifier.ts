import { IAIAdapter, OpenAIAdapter } from "../ai/openai-adapter";
import { IMainController } from "./main";

export interface IMainNotifier {
  notify(label: string, data: any): Promise<void>;
  notifyError(label: string, data: any): Promise<void>;
}

export class MainNotifier implements IMainNotifier {
  aiAdapter: IAIAdapter;
  main: IMainController;

  constructor(main: IMainController, aiAdapter?: IAIAdapter) {
    this.aiAdapter = aiAdapter || this.createAiAdapter();
    this.main = main;
  }

  protected createAiAdapter() {
    return new OpenAIAdapter();
  }

  isGiteaAction(action: any) {
    if (!this.isAction(action)) return;
    return action.target !== "gitea";
  }

  isAction(obj: any) {
    return obj.type === "action";
  }

  handleAction(action: any) {
    if (!this.isGiteaAction(action)) return;
    this.main.handle(action);
  }

  handleResponse(aiResponse: string) {
    try {
      const action = JSON.parse(aiResponse);
      this.handleAction(action);
    } catch (error) {
      console.log("Not a gitea action");
    }
  }

  async notifyError(label: string, data: any) {
    await this.notify(`ERROR:${label}`, data);
  }

  async notify(label: string, data: any) {
    const message = JSON.stringify(label, data);
    const aiResponses = await this.aiAdapter.notifyAi(message);
    for (const response of aiResponses) {
      this.handleResponse(response);
    }
  }
}
