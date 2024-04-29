import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteRelease } from "./definition";

export const buildDeleteReleaseHandler = (main: IMainController) =>
  new DeleteReleaseActionHandler(main);

export class DeleteReleaseActionHandler extends CompositeActionHandler {
  name = "delete_release";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = Number(action.fnArgs.id);
    const data = await this.main.repos.releases.deleteById(id);
    console.log({ data });
  }

  get definition(): any {
    return deleteRelease;
  }
}
