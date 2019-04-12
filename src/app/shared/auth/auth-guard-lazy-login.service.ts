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
export class AuthGuardLoginLazy implements CanLoad {

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

    canLoad(route: Route): boolean  {
        if (this.tokenStorageService.isAuthenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        } else {
            this.router.navigate(['/customer/customer-list']);
            return true;
        }

    }



}
