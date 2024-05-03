import { HttpResponse } from "gitea-js";
import { RepoAccessor } from "./repo-accesser";

export type NotifyOpts = {
  label: string;
  returnVal?: any;
  response: HttpResponse<any, any>;
};
export type NotifyErrorOpts = {
  label: string;
  returnVal?: any;
  error: any;
};

export class RepoBaseController extends RepoAccessor {
  shouldThrow = false;

  public setShouldThrow(shouldThrow: boolean) {
    this.shouldThrow = shouldThrow;
    return this;
  }

  protected get coreData() {
    return {};
  }

  protected notifyData(...rest: any[]) {
    return {
      ...this.coreData,
      ...rest,
    };
  }

  protected enrichedNotification(
    response: HttpResponse<any, any>,
    ...rest: any[]
  ) {
    const notification = this.notifyData(...rest);
    this.enrich(notification, response);
    return notification;
  }

  protected enrichedNotificationError(error: any, ...rest: any[]) {
    return this.notifyData(...rest, { error: error.message || error });
  }

  protected async notifyEnriched(
    label: string,
    response: HttpResponse<any, any>,
    ...rest: any[]
  ) {
    const notification = this.enrichedNotification(response, ...rest);
    await this.notify(label, notification);
  }

  protected async notifyEnrichedError(
    label: string,
    error: any,
    ...rest: any[]
  ) {
    const notification = this.enrichedNotificationError(error, ...rest);
    await this.notify(label, notification);
  }

  protected async notifyErrorAndReturn(
    { label, error, returnVal }: NotifyErrorOpts,
    ...rest: any[]
  ) {
    await this.notifyEnrichedError(label, error, ...rest);
    if (this.shouldThrow) {
      throw error;
    }
    return returnVal;
  }

  protected async notifyAndReturn<D, E extends unknown = unknown>(
    { label, response, returnVal }: NotifyOpts,
    ...rest: any[]
  ) {
    await this.notifyEnriched(label, response, ...rest);
    return this.returnData<D, E>(response, returnVal);
  }

  protected returnData<D, E extends unknown = unknown>(
    response: HttpResponse<D, unknown>,
    onError?: E
  ) {
    return response.ok ? response.data : onError || undefined;
  }
}
