import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateReleaseHandler } from "./create";
import { buildDeleteReleaseHandler } from "./delete";
import { buildGetReleaseHandler } from "./get";
import { buildListReleasesHandler } from "./list";

export const buildReleasesHandler = (main: IMainController) =>
  new RepoReleaseActionHandler(main);

export class RepoReleaseActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateReleaseHandler,
      buildDeleteReleaseHandler,
      buildGetReleaseHandler,
      buildListReleasesHandler,
    ];
  }
}
