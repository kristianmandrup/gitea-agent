import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getWikiPage } from "./definition";

export const buildGetWikiPagesHandler = (main: IMainController) =>
  new GetWikiPagesActionHandler(main);

export class GetWikiPagesActionHandler extends CompositeActionHandler {
  name = "get_wiki_page";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { pageName } = action.fnArgs;
    const data = await this.main.repos.wikis.getPage(pageName);
    console.log({ data });
  }

  get definition(): any {
    return getWikiPage;
  }
}
