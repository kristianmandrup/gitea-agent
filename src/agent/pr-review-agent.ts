// import { FileChange, FileChangeHandler } from "../api/repo/file-change";
// import { GiteaRepositoryController } from "../api/repo/repository";
// import { RepoAccessor } from "../api/repo/repo-accesser";

export class PullRequestReviewAgent {}

// interface PullRequest {
//   id: number;
//   title: string;
//   filesChanged: string[];
// }

// interface ReviewSuggestion {
//   file: string;
//   comment: string;
// }

// export class ReviewSuggestions extends RepoAccessor {
//   pullRequest: PullRequest;
//   fileChangeHandler: FileChangeHandler;

//   constructor(repository: GiteaRepositoryController, pullRequest: PullRequest) {
//     super(repository);
//     this.fileChangeHandler = this.createFileChangeHandler();
//     this.pullRequest = pullRequest;
//   }

//   createFileChangeHandler() {
//     return new FileChangeHandler(this.repository);
//   }

//   async getReviewCommentsForFileChange(fileChange: FileChange) {
//     return "it changed";
//   }

//   // call external agent
//   async getReviewSuggestionsForPr() {
//     const fileChanges: FileChange[] =
//       await this.fileChangeHandler.getFileChanges(this.pullRequest.id);
//     const suggestions: ReviewSuggestion[] = [];
//     for (const fileChange of fileChanges) {
//       const comment = await this.getReviewCommentsForFileChange(fileChange);
//       const reviewSuggestion = {
//         file: fileChange.filename,
//         comment,
//       };
//       suggestions.push(reviewSuggestion);
//     }
//     return suggestions;
//   }

//   async applyReviewSuggestions(
//     reviewSuggestions: ReviewSuggestion[]
//   ): Promise<void> {
//     // Mock function to apply review suggestions
//     console.log("Applying review suggestions:");
//     for (const suggestion of reviewSuggestions) {
//       console.log(`- ${suggestion.comment}`);
//     }
//   }

//   //   async reviewPullRequests(pullRequests: PullRequest[]): Promise<void> {
//   //     for (const pullRequest of pullRequests) {
//   //       console.log(`Reviewing pull request: ${pullRequest.title}`);
//   //       const reviewSuggestions = await this.generateReviewSuggestionsForPr();
//   //       await this.applyReviewSuggestions(reviewSuggestions);
//   //     }
//   //   }
// }

// // Usage example:
// // const pullRequests: PullRequest[] = [
// //   {
// //     title: "Feature: Add login functionality",
// //     filesChanged: ["src/login.ts", "src/authenticate.ts"],
// //   },
// //   {
// //     title: "Bug fix: Fix authentication issue",
// //     filesChanged: ["src/authenticate.ts", "src/utils.ts"],
// //   },
// // ];

// // reviewPullRequests(pullRequests);
