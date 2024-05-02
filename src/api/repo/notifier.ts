import { IAIAdapter, OpenAIAdapter } from "../../ai/openai-adapter";
import { IMainController } from "../main";

export interface IRepoNotifier {
  notify(label: string, data: any): Promise<void>;
  notifyError(label: string, data: any): Promise<void>;
}

export class RepoNotifier implements IRepoNotifier {
  aiAdapter: IAIAdapter;
  main: IMainController;

  constructor(main: IMainController, aiAdapter?: IAIAdapter) {
    this.aiAdapter = aiAdapter || this.createAiAdapter();
    this.main = main;
  }

  protected createAiAdapter() {
    return new OpenAIAdapter();
  }

  parseAction(action: any) {
    if (action.target !== "gitea") return;
    this.main.handle(action);
  }

  isAction(obj: any) {
    return obj.type === "action";
  }

  handleResponse(aiResponse: string) {
    try {
      const obj = JSON.parse(aiResponse);
      this.isAction(obj) && this.parseAction(obj);
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
