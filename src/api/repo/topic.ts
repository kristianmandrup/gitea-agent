import { RepoAccessor } from "./repo-accesser";

export interface IRepoTopicController {
  addTopic(topic: string): Promise<any>;
}

export class GiteaRepoTopicController extends RepoAccessor {
  async addTopic(topic: string) {
    const response = await this.api.repos.repoAddTopic(
      this.owner,
      this.repoName,
      topic
    );
    return response.data;
  }

  // repoDeleteTopic: (owner: string, repo: string, topic: string
  // repoUpdateTopics: (owner: string, repo: string, body: RepoTopicOptions
  // repoListTopics: (owner: string, repo: string
}
