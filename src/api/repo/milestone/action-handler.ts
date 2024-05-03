import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateMilestoneHandler } from "./create";
import { buildDeleteMilestoneHandler } from "./delete";
import { buildGetMilestoneHandler } from "./get";
import { buildListMilestonesHandler } from "./list";

export const buildMilestonesHandler = (main: IMainController) =>
  new RepoMilestonesActionHandler(main);

export class RepoMilestonesActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateMilestoneHandler,
      buildDeleteMilestoneHandler,
      buildGetMilestoneHandler,
      buildListMilestonesHandler,
    ];
  }
}
