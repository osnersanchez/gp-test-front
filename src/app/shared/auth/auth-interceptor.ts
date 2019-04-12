import {
    Injectable
} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';

import {
    Observable,
    of
} from 'rxjs';
import {
    Router
} from '@angular/router';
import {
    catchError
} from 'rxjs/internal/operators';
import { TokenStorageService } from './token-storage.service';
import { MatSnackBar } from '@angular/material';
import { LoginManagerService } from '../subjects/login-manager.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public tokenStorageService: TokenStorageService,
         private router: Router,
         public snackBar: MatSnackBar,
         public loginManagerService: LoginManagerService) {}


    /**
     * intercept all XHR request
     * @param request
     * @param next
     * @returns {Observable<A>}
     */
    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

          const token = this.tokenStorageService.getToken();

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${ token }`
            }
          });
        /**
         * continues request execution
         */
        return next.handle(request).pipe(catchError((error, caught) => {
            // intercept the respons error and displace it to the console
            console.log(error);
            this.handleAuthError(error);
            return of(error);
        }) as any);
    }


    /**
     * manage errors
     * @param err
     * @returns {any}
     */
    private handleAuthError(err: HttpErrorResponse): Observable < any > {
        // handle your auth error or rethrow
        if (err instanceof HttpErrorResponse && err.status === 401) {
            // navigate /delete cookies or whatever
            console.log('handled error ' + err.status);
            this.tokenStorageService.deleteToken();
            this.snackBar.open('Sesión expirada!!! por favor vuelva a ingresar a la plataforma', null, {
                duration: 3000
              });
            this.loginManagerService.setStatusLoggedIn(false);
            this.router.navigate([`/`]);
            // if you've caught /
            // handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message);
        }
        throw err;
    }
}
