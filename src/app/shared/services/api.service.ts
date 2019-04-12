import {
    Injectable
} from '@angular/core';
import {
    HttpParams,
    HttpClient
} from '@angular/common/http';
import {
    Environments
} from '../../../environments/environments.constanst';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}
    get(endpoint: string, params ?: any, requestOpts ?: any) {
        if (!requestOpts) {
            requestOpts = {
                params: new HttpParams()
            };
        }
        if (params) {
            requestOpts.params = new HttpParams();
            for (const k of params) {
                requestOpts.params = requestOpts.params.set(k, params[k]);
            }
        }

        return this.httpClient.get(
            Environments.API_ENDPOINT + '/' + endpoint,
            requestOpts
        );
    }

    post(endpoint: string, body: any, requestOpts ?: any) {
        return this.httpClient.post(
            Environments.API_ENDPOINT + '/' + endpoint,
            body,
            requestOpts
        );
    }

    put(endpoint: string, body: any, requestOpts ?: any) {
        return this.httpClient.put(
            Environments.API_ENDPOINT + '/' + endpoint,
            body,
            requestOpts
        );
    }

    delete(endpoint: string, requestOpts ?: any) {
        return this.httpClient.delete(
            Environments.API_ENDPOINT + '/' + endpoint,
            requestOpts
        );
    }

    patch(endpoint: string, body: any, requestOpts ?: any) {
        return this.httpClient.patch(
            Environments.API_ENDPOINT + '/' + endpoint,
            body,
            requestOpts
        );
    }
}
