import { RepoAccesser } from "./repo-accesser";
import {
  CreatePullReviewOptions,
  PullRequest,
  PullReviewRequestOptions,
} from "gitea-js";
import { GiteaRepository } from "./repository";

interface IPullRequest {
  title: string;
  // Add more properties as needed
}

export class GiteaPullRequest extends RepoAccesser {
  pr: PullRequest;
  index: number;

  constructor(repository: GiteaRepository, pr: PullRequest) {
    super(repository);
    this.pr = pr;
    const index = this.pr.id;
    if (!index) {
      throw new Error(`PR is missing index`);
    }
    this.index = index;
  }

  async createPullReviewRequests(opts: PullReviewRequestOptions) {
    const response = await this.api.repos.repoCreatePullReviewRequests(
      this.owner,
      this.repoName,
      this.index,
      opts
    );
    return response.data;
  }

  async createPullRequestReview(opts: CreatePullReviewOptions) {
    const response = await this.api.repos.repoCreatePullReview(
      this.owner,
      this.repoName,
      this.index,
      opts
    );
    return response.data;
  }
}

// export async function createFeatureBranch(branchName: string): Promise<void> {
//   try {
//     // Create the feature branch
//     await api.post(`/repos/{owner}/{repo}/git/refs`, {
//       ref: `refs/heads/${branchName}`,
//       sha: "your-target-branch-sha", // Replace with the SHA of the target branch
//     });
//     console.log(`Feature branch "${branchName}" created successfully.`);
//   } catch (error: any) {
//     console.error("Error creating feature branch:", error.response?.data);
//   }
// }

export async function pushChangesToBranch(branchName: string): Promise<void> {
  try {
    // Push changes to the feature branch
    // You would typically use git commands or a Git library to perform this operation
    console.log(`Changes pushed to branch "${branchName}".`);
  } catch (error) {
    console.error("Error pushing changes to branch:", error);
  }
}

// export async function createPullRequest(branchName: string): Promise<void> {
//   try {
//     // Create a pull request for the feature branch
//     const response: AxiosResponse<PullRequest> = await api.post(
//       `/repos/{owner}/{repo}/pulls`,
//       {
//         title: `Feature: ${branchName}`,
//         // Add more properties as needed
//       }
//     );
//     console.log(`Pull request created for branch "${branchName}".`);
//   } catch (error: any) {
//     console.error("Error creating pull request:", error.response?.data);
//   }
// }

// // Usage example:
// async function main() {
//   const featureBranchName = "my-feature-branch";

//   // Step 1: Create feature branch
//   await createFeatureBranch(featureBranchName);

//   // Step 2: Push changes to feature branch
//   await pushChangesToBranch(featureBranchName);

//   // Step 3: Create pull request
//   await createPullRequest(featureBranchName);

//   // Step 4: Review pull requests
//   // await reviewPullRequests();
// }

// main();
