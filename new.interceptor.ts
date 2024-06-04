import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, switchMap, throwError } from 'rxjs';

export const jwtInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  let isRefreshingToken = false;
  const tokenSubject = new BehaviorSubject<string>('');

  const addToken = (request: HttpRequest<any>): HttpRequest<any> => {
    const token = authService.accessToken;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  };

  const handle403Error = () => {
    authService.logOut();
    return EMPTY;
  };

  const handle401Error = (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      tokenSubject.next('');

      return authService.getRefreshToken().pipe(
        switchMap((newToken) => {
          isRefreshingToken = false;
          tokenSubject.next(newToken);
          return next(addToken(request));
        }),
        catchError((error) => {
          isRefreshingToken = false;
          handle403Error();
          return throwError(error);
        })
      );
    } else {
      return tokenSubject.pipe(
        switchMap((token) => {
          return next(addToken(request));
        })
      );
    }
  };

  req = addToken(req);

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
            if (req.url.includes('login') || req.url.includes('register')) {
              return throwError(err);
            }
            return handle401Error(req);
          case 403:
            return handle403Error();
          default:
            return throwError(err);
        }
      } else {
        return throwError(err);
      }
    })
  );
};
