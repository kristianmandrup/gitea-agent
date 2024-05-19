import { Api } from "gitea-js";
import { GiteaApi } from "./api";
import { IMainController } from "./main";
import { BaseController } from "./base-controller";

export interface IMainAccessor {
  main: IMainController;
  gitea: GiteaApi;
  api: Api<unknown>;
}

export abstract class GiteaMainAccessor extends BaseController {
  constructor(main: IMainController) {
    super(main);
  }

  get gitea() {
    return this.main.gitea;
  }

  get api() {
    return this.gitea.api;
  }
}
