import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listReleases } from "./definition";

export const buildListReleasesHandler = (main: IMainController) =>
  new ListReleasesActionHandler(main);

export class ListReleasesActionHandler extends CompositeActionHandler {
  name = "list_releases";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.repos.releases.list();
    console.log({ data });
  }

  get definition(): any {
    return listReleases;
  }
}
