import { RepoAccesser } from "./repo-accesser";

export interface ITopicController {
  addTopic(topic: string): Promise<any>;
}

export class GiteaTopicController extends RepoAccesser {
  async addTopic(topic: string) {
    const response = await this.api.repos.repoAddTopic(
      this.owner,
      this.repoName,
      topic
    );
    return response.data;
  }
}
