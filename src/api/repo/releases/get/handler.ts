import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getRelease } from "./definition";

export const buildGetReleaseHandler = (main: IMainController) =>
  new GetReleaseActionHandler(main);

export class GetReleaseActionHandler extends CompositeActionHandler {
  name = "get_release";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = Number(action.fnArgs.id);
    const data = await this.main.repos.releases.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getRelease;
  }
}
