import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data<T> {
  data: T;
}

// 响应拦截器根据模板返回数据
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: any, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          data,
          success: true,
        };
      })
    );
  }
}
