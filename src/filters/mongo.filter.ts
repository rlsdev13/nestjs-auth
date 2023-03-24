import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { mongo } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

@Catch(mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = '';

    switch (exception.code){
      case 11000:
        message = `Duplicate unique key '${Object.keys(exception.keyValue)}'`;
      default:
        break;
    }

    response.status(400).json({
      statusCode : 400,
      message
    })
    
  }
}