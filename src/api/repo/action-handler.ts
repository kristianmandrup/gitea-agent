import { ActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildBranchHandler } from "./branch";

export const buildRepoHandler = (main: IMainController) =>
  new RepoActionHandler(main);

export class RepoActionHandler extends ActionHandler {
  get handlers() {
    return [buildBranchHandler];
  }
}
