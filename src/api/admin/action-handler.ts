import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildCreateOrgHandler } from "./create_org";
import { buildCreateRepoHandler } from "./create_repo";
import { buildUsersHandler } from "./users";
import { buildPublicKeyHandler } from "./public_key";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateOrgHandler,
      buildCreateRepoHandler,
      buildUsersHandler,
      buildPublicKeyHandler,
    ];
  }
}
