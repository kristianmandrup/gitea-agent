import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createRelease } from "./definition";

export const buildCreateReleaseHandler = (main: IMainController) =>
  new CreateReleaseActionHandler(main);

export class CreateReleaseActionHandler extends CompositeActionHandler {
  name = "create_release";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const opts = action.fnArgs;
    const data = await this.main.repos.releases.create(opts);
    console.log({ data });
  }

  get definition(): any {
    return createRelease;
  }
}