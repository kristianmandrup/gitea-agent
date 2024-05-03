import { IMainController } from "../main";
import { NotificationAssist } from "../notification-assist";
import { IRepoNotifier, RepoNotifier } from "./notifier";
import { IRepoController } from "./repository/controller";

export interface IRepoAccessor {
  main: IMainController;
  repo: IRepoController;
  notifier: IRepoNotifier;
}

export class RepoAccessor extends NotificationAssist implements IRepoAccessor {
  repo: IRepoController;
  notifier: IRepoNotifier;

  constructor(repo: IRepoController, opts: any = {}) {
    super();
    this.repo = repo;
    this.notifier = opts.notifier || this.createNotifier();
  }

  get main() {
    return this.repo.main;
  }

  async notify(label: string, data: any) {
    await this.notifier.notify(label, data);
  }

  async notifyError(label: string, data: any) {
    await this.notifier.notifyError(label, data);
  }

  createNotifier() {
    return new RepoNotifier(this.main);
  }

  get api() {
    return this.repo.api;
  }

  get repoData() {
    return {
      owner: this.owner,
      repoName: this.repoName,
    };
  }

  get owner() {
    return this.repo.owner;
  }

  get repoName() {
    return this.repo.name;
  }
}
