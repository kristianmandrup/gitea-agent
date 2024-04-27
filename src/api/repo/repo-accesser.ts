import { GiteaRepositoryController, IRepoController } from "./repository";

export class RepoAccessor {
  repo: IRepoController;

  constructor(repo: IRepoController) {
    this.repo = repo;
  }

  get api() {
    return this.repo.api;
  }

  get owner() {
    return this.repo.owner;
  }

  get repoName() {
    return this.repo.name;
  }
}
