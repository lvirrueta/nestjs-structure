/**
 * Generic Rest Api response
 */
export class JsonResponse<T> {
  private succeed: boolean;
  private data: T;
  private message: string;
  private created: Date;
  private statusCode: string;

  constructor(obj: IJsonResponse) {
    const { succeed, data, message, statusCode } = obj;
    this.succeed = succeed !== undefined ? succeed : true;
    this.created = new Date();
    this.message = message;
    this.data = data as T;
    this.statusCode = statusCode;
  }
}

export interface IJsonResponse {
  succeed?: boolean;
  data: unknown;
  message?: string;
  statusCode?: string;
}
