import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildBranchHandler } from "./branch";

export const buildRepoHandler = (main: IMainController) =>
  new RepoActionHandler(main);

export class RepoActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildBranchHandler];
  }
}
