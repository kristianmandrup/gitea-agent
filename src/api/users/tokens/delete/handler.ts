import { LeafActionHandler } from "../../../actions";
import { Action } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteUserAccessToken } from "./definition";

export const buildDeleteUserAccessTokenHandler = (main: IMainController) =>
  new DeleteUserAccessTokenActionHandler(main);

export class DeleteUserAccessTokenActionHandler extends LeafActionHandler {
  name = "delete_user_access_token";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { username, tokenName } = action.fnArgs;
    const data = await this.main.users.tokens.delete(username, tokenName);
    console.log({ data });
  }

  get definition(): any {
    return deleteUserAccessToken;
  }
}
