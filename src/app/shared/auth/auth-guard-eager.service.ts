import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import {
    Injectable
} from '@angular/core';
import {
    TokenStorageService
} from './token-storage.service';
import { Observable } from '../../../../node_modules/rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardEager implements CanActivate {

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.tokenStorageService.isAuthenticated()) {

            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
