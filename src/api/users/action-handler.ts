import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildListUserKeysHandler } from "./list_keys";
import { buildListUserReposHandler } from "./list_repos";
import { buildListUserOrgsHandler } from "./list_orgs";
import { buildUserTokensHandler } from "./tokens";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildListUserKeysHandler,
      buildListUserReposHandler,
      buildListUserOrgsHandler,
      buildUserTokensHandler,
    ];
  }
}
