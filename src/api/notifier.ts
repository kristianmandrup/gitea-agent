import { IAIAdapter, OpenAIAdapter } from "../ai/openai-adapter";
import { Action } from "./actions";
import { IMainController } from "./main";

export interface INotifier {
  notify(label: string, data: any): Promise<void>;
  notifyError(label: string, data: any): Promise<void>;
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

  isGiteaAction(action: any) {
    if (!this.isAction(action)) return;
    return action.target !== "gitea";
  }

  isAction(obj: any) {
    return obj.type === "action";
  }

  handleAction(actionObj: any) {
    if (!this.isGiteaAction(actionObj)) return;
    const action = Action.createFrom(actionObj);
    this.main.handle(action);
  }

  public handleResponse(aiResponse: string) {
    try {
      const actionObj = JSON.parse(aiResponse);
      this.handleAction(actionObj);
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
