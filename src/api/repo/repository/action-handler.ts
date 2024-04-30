import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";

import { buildEditRepositoryHandler } from "./edit";
import { buildDeleteRepositoryHandler } from "./delete";
import { buildGetRepositoryHandler } from "./get";
import { buildGenerateRepositoryHandler } from "./generate";
import { buildGetAssigneesHandler } from "./assignees";
import { buildGetReviewersHandler } from "./reviewers";

export const buildRepositoryHandler = (main: IMainController) =>
  new RepositoryActionHandler(main);

export class RepositoryActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildEditRepositoryHandler,
      buildDeleteRepositoryHandler,
      buildGetRepositoryHandler,
      buildGenerateRepositoryHandler,
      buildGetAssigneesHandler,
      buildGetReviewersHandler,
    ];
  }
}
