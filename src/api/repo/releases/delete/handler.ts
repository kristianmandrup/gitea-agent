import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteRelease } from "./definition";

export const buildDeleteReleaseHandler = (main: IMainController) =>
  new DeleteReleaseActionHandler(main);

export class DeleteReleaseActionHandler extends CompositeActionHandler {
  name = "delete_release";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.arguments.id);
    const data = await this.main.repos.releases.deleteById(id);
    console.log({ data });
  }

  get definition(): any {
    return deleteRelease;
  }
}
