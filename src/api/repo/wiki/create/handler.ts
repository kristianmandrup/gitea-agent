import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createWikiPage } from "./definition";

export const buildCreateWikiPageHandler = (main: IMainController) =>
  new CreateWikiPageActionHandler(main);

export class CreateWikiPageActionHandler extends CompositeActionHandler {
  name = "create_wiki_page";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const opts = action.arguments;
    const data = await this.main.repos.wikis.createPage(opts);
    console.log({ data });
  }

  get definition(): any {
    return createWikiPage;
  }
}
