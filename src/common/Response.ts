import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data<T> {
  code: number;
  data: T;
  success: boolean;
}

// 响应拦截器根据模板返回数据
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          data,
          success: true
        };
      })
    );
  }
}
