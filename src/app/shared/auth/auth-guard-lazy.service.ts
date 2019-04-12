import {
    Router,
    CanLoad,
    Route
} from '@angular/router';
import {
    Injectable
} from '@angular/core';
import {
    TokenStorageService
} from './token-storage.service';
import {
    Observable
} from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class AuthGuardLazy implements CanLoad {

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

    canLoad(route: Route): boolean  {
        if (this.tokenStorageService.isAuthenticated()) {

            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }

    }



}
