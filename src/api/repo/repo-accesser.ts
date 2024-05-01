import { IRepoNotifier, RepoNotifier } from "./notifier";
import { IRepoController } from "./repository/controller";

export interface IRepoAccessor {
  repo: IRepoController;
  notifier: IRepoNotifier;
}

export class RepoAccessor implements IRepoAccessor {
  repo: IRepoController;
  notifier: IRepoNotifier;

  constructor(repo: IRepoController, opts: any = {}) {
    this.repo = repo;
    this.notifier = opts.notifier || this.createNotifier();
  }

  async notify(label: string, data: any) {
    await this.notifier.notify(label, data);
  }

  createNotifier() {
    return new RepoNotifier();
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
