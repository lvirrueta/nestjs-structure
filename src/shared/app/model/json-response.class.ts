/**
 * Generic Rest Api response
 */
export class JsonResponse<T> {
  private succeed: boolean;
  private data: T;
  private message: string;
  private created: Date;
  private code: string;

  constructor(obj: IJsonResponse) {
    const { succeed, data, message, code } = obj;
    this.succeed = succeed !== undefined ? succeed : true;
    this.created = new Date();
    this.message = message;
    this.data = data as T;
    this.code = code;
  }
}

export interface IJsonResponse {
  succeed?: boolean;
  data: unknown;
  message?: string;
  code?: string;
}
