import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const startTime = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => {
          const endTime = Date.now();
          const timeTaken = endTime - startTime;
          console.log(`URL: ${url} - Time taken: ${timeTaken}ms`);
        }),
      );
  }
}