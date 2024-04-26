import { GiteaRepositoryController } from "./repository";

export class RepoAccesser {
  repository: GiteaRepositoryController;

  constructor(repository: GiteaRepositoryController) {
    this.repository = repository;
  }

  get api() {
    return this.repository.api;
  }

  get owner() {
    return this.repository.owner;
  }

  get repoName() {
    return this.repository.name;
  }
}
