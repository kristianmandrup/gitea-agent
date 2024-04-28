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

  // Useful for Pull Requests
  // {
  //   "status": "success",
  //   "ahead_by": 2,
  //   "behind_by": 0,
  //   "total_commits": 2,
  //   "commits": [
  //     {
  //       "sha": "abcdef123456",
  //       "message": "Commit message 1",
  //       "author": {
  //         "name": "Author Name",
  //         "email": "author@example.com"
  //       }
  //     },
  //     {
  //       "sha": "789012345678",
  //       "message": "Commit message 2",
  //       "author": {
  //         "name": "Author Name",
  //         "email": "author@example.com"
  //       }
  //     }
  //   ],
  //   "files": [
  //     {
  //       "filename": "src/file1.js",
  //       "status": "modified",
  //       "additions": 10,
  //       "deletions": 5,
  //       "changes": 15,
  //       "blob_url": "https://gitea.com/owner/repo/raw/commit_sha/src/file1.js",
  //       "raw_url": "https://gitea.com/owner/repo/raw/commit_sha/src/file1.js"
  //     },
  //     {
  //       "filename": "src/file2.js",
  //       "status": "added",
  //       "additions": 20,
  //       "deletions": 0,
  //       "changes": 20,
  //       "blob_url": "https://gitea.com/owner/repo/raw/commit_sha/src/file2.js",
  //       "raw_url": "https://gitea.com/owner/repo/raw/commit_sha/src/file2.js"
  //     },
  //     {
  //       "filename": "src/file3.js",
  //       "status": "deleted",
  //       "additions": 0,
  //       "deletions": 30,
  //       "changes": 30
  //     }
  //   ]
  // }
  // status: Indicates whether the comparison was successful.
  // ahead_by: Number of commits ahead of the base.
  // behind_by: Number of commits behind the base.
  // total_commits: Total number of commits between the base and head.
  // commits: Array of commit objects with details like SHA, message, and author.
  // files: Array of file change objects with details like filename, status (modified, added, or deleted), additions, deletions, and URLs to view the file contents.
  public async compareDiff(
    base: string,
    compare: string
  ): Promise<FileChange[]> {
    try {
      const response = await axios.get<FileChange[]>(
        `https://api.github.com/repos/${this.owner}/${this.repoName}/compare/${base}...${compare}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching file changes:", error);
      return [];
    }
  }
}
