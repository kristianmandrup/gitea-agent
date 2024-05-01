import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateWikiHandler } from "./create";
import {} from "./delete";
import {} from "./get";
import {} from "./list";

export const buildWikiHandler = (main: IMainController) =>
  new RepoWikiActionHandler(main);

export class RepoWikiActionHandler extends CompositeActionHandler {
  get handlers() {
    return [];
  }
}
