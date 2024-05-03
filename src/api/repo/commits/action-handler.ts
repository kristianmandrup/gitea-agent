import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import {} from "./get";
import { buildListCommitsHandler } from "./list";
import { buildGetCommitHandler } from "./get";

export const buildCommitsHandler = (main: IMainController) =>
  new RepoCommitsActionHandler(main);

export class RepoCommitsActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildGetCommitHandler, buildListCommitsHandler];
  }
}
