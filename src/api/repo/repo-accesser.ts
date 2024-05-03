import { IMainController } from "../main";
import { NotificationAssist } from "../notification-assist";
import { IRepoController } from "./repository/controller";

export interface IRepoAccessor {
  main: IMainController;
  repo: IRepoController;
}

export class RepoAccessor implements IRepoAccessor {
  repo: IRepoController;

  constructor(repo: IRepoController, opts: any = {}) {
    this.repo = repo;
  }

  get main() {
    return this.repo.main;
  }

  get api() {
    return this.repo.api;
  }

  get repoData() {
    return this.repo.repoData;
  }

  get owner() {
    return this.repo.owner;
  }

  get repoName() {
    return this.repo.name;
  }
}
