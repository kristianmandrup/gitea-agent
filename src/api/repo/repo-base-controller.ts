import { HttpResponse } from "gitea-js";
import { BaseController } from "../base-controller";
import { IRepoController } from "./repository";
import { INotifier } from "../notifier";
import { RepoNotifier } from "./repo-notifier";

export type NotifyOpts = {
  label: string;
  returnVal?: any;
  response: HttpResponse<any, any>;
};
export type NotifyErrorOpts = {
  label: string;
  returnVal?: any;
  error: any;
};

export class RepoBaseController extends BaseController {
  shouldThrow = false;
  notifier: INotifier;
  controller: IRepoController;

  baseLabel = "repo";

  $api = this.main.api.repos;

  constructor(controller: IRepoController, opts: any = {}) {
    super(controller.main, opts);
    this.controller = controller;
    this.notifier = opts.notifier || this.createNotifier();
  }

  async notify(label: string, data: any) {
    await this.notifier.notify(label, data);
  }

  async notifyError(label: string, data: any) {
    await this.notifier.notifyError(label, data);
  }

  get owner() {
    return this.controller.owner;
  }

  get repoName() {
    return this.controller.name;
  }

  createNotifier() {
    return new RepoNotifier(this.main);
  }

  get coreData() {
    return this.controller.repoData;
  }
}
