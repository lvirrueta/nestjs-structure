import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { JsonResponse } from '../model/json-response.class';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const eResponse = exception.getResponse() as any;
    const eMessage = eResponse.message;
    const eCode = eResponse.statusCode;
    const responseP =
      status !== 500 ? new JsonResponse({ succeed: false, statusCode: eCode, message: eMessage, data: undefined }) : eResponse;

    responseP.errorCode = eResponse.errorCode;
    const response = ctx.getResponse<Response>();
    response.status(status).json(responseP);
  }
}
