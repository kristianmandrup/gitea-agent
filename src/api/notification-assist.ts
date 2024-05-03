import { HttpResponse } from "gitea-js";

export abstract class NotificationAssist {
  enrich(notification: any, response: HttpResponse<unknown, unknown>) {
    if (response.ok) {
      notification.data = response.data;
    } else {
      notification.error = response.error;
    }
  }
}
