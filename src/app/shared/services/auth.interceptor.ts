
import { AuthService } from 'app/shared/services/auth.service';
import { LocalStorgrUtil } from './../utils/local-storge.util';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url === AuthService.ENDPOINT) {
            console.log('to be skipped if it\'s login');
            return next.handle(req);
        }
        const duplicate = req.clone({ params: req.params.set('auth', AuthService.getToken()) });

        console.log('AuthInterceptor called  :', req.params);
        console.log('AuthInterceptor called params after :', duplicate.params);
        return next.handle(duplicate);
    }
}
