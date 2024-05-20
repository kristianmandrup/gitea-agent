import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createRelease } from "./definition";

export const buildCreateReleaseHandler = (main: IMainController) =>
  new CreateReleaseActionHandler(main);

export class CreateReleaseActionHandler extends CompositeActionHandler {
  name = "create_release";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const opts = action.arguments;
    const data = await this.main.repos.releases.create(opts);
    console.log({ data });
  }

  get definition(): any {
    return createRelease;
  }
}
