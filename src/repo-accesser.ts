import { GiteaRepository } from "./repository";

export class RepoAccesser {
  repository: GiteaRepository;

  constructor(repository: GiteaRepository) {
    this.repository = repository;
  }

  get owner() {
    return this.repository.owner;
  }

  get repoName() {
    return this.repository.name;
  }
}
