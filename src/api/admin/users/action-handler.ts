import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateUserHandler } from "./create";
import { buildDeleteUserHandler } from "./delete";

export const buildUsersHandler = (main: IMainController) =>
  new UsersActionHandler(main);

export class UsersActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildCreateUserHandler, buildDeleteUserHandler];
  }
}
