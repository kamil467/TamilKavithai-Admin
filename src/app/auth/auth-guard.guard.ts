import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, first, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private angularFireAuth:AngularFireAuth,private router :Router)
  {
  
  }
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      const authResult = this.angularFireAuth.authState.pipe(first(),map(result => {
  
        if(result)
        {
          console.log("User is here");
          console.log(result);
          return true;
        }
       
        this.router.navigate(['login']);
      }),catchError(err =>{
        return this.handleError(err);
      }));
  
    return authResult;
    }
    
  
    private handleError(error: HttpErrorResponse,caller:string= null) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
          console.error("Detailed error is :"+error +"and caller is:"+caller);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened; please try again later.');
    }
  
}
