import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateUserAccessTokenHandler } from "./create";
import { buildDeleteUserAccessTokenHandler } from "./delete";

export const buildUserTokensHandler = (main: IMainController) =>
  new UserTokensActionHandler(main);

export class UserTokensActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateUserAccessTokenHandler,
      buildDeleteUserAccessTokenHandler,
    ];
  }
}
