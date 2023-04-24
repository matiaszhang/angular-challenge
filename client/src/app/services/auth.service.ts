import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const apiURL = `${process.env['SERVER_URL']}/api/auth`;

const register =
  (http: HttpClient) =>
  (email: string, password: string): Observable<any> => {
    return http.post(`${apiURL}/register`, { email, password });
  };

const login =
  (http: HttpClient) =>
  (email: string, password: string): Observable<any> => {
    return http
      .post<{ token: string }>(`${apiURL}/login`, { email, password })
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('access_token', token);
        })
      );
  };

const logout = (): void => {
  localStorage.removeItem('access_token');
};

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

export const authServiceFactory = (http: HttpClient) => {
  return {
    register: register(http),
    login: login(http),
    logout,
    isAuthenticated,
  };
};

export const AuthService = {
  provide: 'AuthService',
  useFactory: authServiceFactory,
  deps: [HttpClient],
};
