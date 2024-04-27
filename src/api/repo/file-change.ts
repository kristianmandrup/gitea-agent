import axios from "axios";
import { GiteaRepositoryController } from "./repository";
import { RepoAccessor } from "./repo-accesser";

export interface PullRequest {
  title: string;
  filesChanged: string[];
}

export interface FileChange {
  additions: number;
  changes: number;
  deletions: number;
  filename: string;
  html_url: string;
  raw_url: string;
  status: string;
}

export interface ReviewSuggestion {
  file: string;
  suggestions: string[];
}

export class FileChangeHandler extends RepoAccessor {
  constructor(repository: GiteaRepositoryController) {
    super(repository);
  }

  public async getFileChanges(pullRequestId: number): Promise<FileChange[]> {
    try {
      const response = await axios.get<FileChange[]>(
        `https://api.github.com/repos/${this.owner}/${this.repoName}/pulls/${pullRequestId}/files`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching file changes:", error);
      return [];
    }
  }
}
