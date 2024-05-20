import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteUser } from "./definition";

export const buildDeleteUserHandler = (main: IMainController) =>
  new DeleteUserActionHandler(main);

export class DeleteUserActionHandler extends CompositeActionHandler {
  name = "delete_user";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.arguments;
    const data = await this.main.orgs.delete(name);
    console.log({ data });
  }

  get definition(): any {
    return deleteUser;
  }
}
