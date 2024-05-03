import { LeafActionHandler } from "../../../actions";
import { Action } from "../../../actions";
import { IMainController } from "../../../main";
import { createUserAccessToken } from "./definition";

export const buildCreateUserAccessTokenHandler = (main: IMainController) =>
  new CreateUserAccessTokenActionHandler(main);

export class CreateUserAccessTokenActionHandler extends LeafActionHandler {
  name = "create_user_access_token";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { username, tokenName, scopes } = action.fnArgs;
    const data = await this.main.users.tokens.create(username, {
      scopes,
      name: tokenName,
    });
    console.log({ data });
  }

  get definition(): any {
    return createUserAccessToken;
  }
}
