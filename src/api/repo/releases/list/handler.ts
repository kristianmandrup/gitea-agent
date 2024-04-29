import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listReleases } from "./definition";

export const buildListReleasesHandler = (main: IMainController) =>
  new ListReleasesActionHandler(main);

export class ListReleasesActionHandler extends CompositeActionHandler {
  name = "list_release";

  async handle(_action: Action) {
    const data = await this.main.repos.releases.list();
    console.log({ data });
  }

  get definition(): any {
    return listReleases;
  }
}
