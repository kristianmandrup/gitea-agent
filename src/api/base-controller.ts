import { Api, HttpResponse } from "gitea-js";
import { IMainController } from "./main";
import {
  NotificationAssist,
  NotifyErrorOpts,
  NotifyOpts,
} from "./notification-assist";

export interface IBaseController {
  api: Api<unknown>;
  shouldThrow: boolean;
  coreData: Record<string, any>;
}

export class BaseController {
  main: IMainController;
  shouldThrow = false;
  assist: NotificationAssist;

  baseLabel = "unknown";

  constructor(main: IMainController, opts: any = {}) {
    this.main = main;
    this.assist = this.createNotificationAssist(opts);
  }

  protected labelFor(operation: string) {
    return [this.baseLabel, operation].join(":");
  }

  get api() {
    return this.main.api;
  }

  public async notifyErrorAndReturn(opts: NotifyErrorOpts, ...rest: any[]) {
    return await this.assist.notifyErrorAndReturn(opts, ...rest);
  }

  protected async notifyAndReturn<D, E extends unknown = unknown>(
    opts: NotifyOpts,
    ...rest: any[]
  ) {
    return await this.assist.notifyAndReturn<D, E>(opts, ...rest);
  }

  protected createNotificationAssist(opts: any = {}) {
    return new NotificationAssist(this.main, this, opts);
  }

  public get coreData() {
    return {};
  }

  public setShouldThrow(shouldThrow: boolean) {
    this.shouldThrow = shouldThrow;
    return this;
  }
}
