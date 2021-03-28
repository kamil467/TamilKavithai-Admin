import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { category, Kavithai } from '../interface/kavithai';
import {HttpErrorResponse} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { FirebaseCollectionAPI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KavithaiServiceService {

  constructor(private angularFireCloudStore: AngularFirestore) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error("Error occurred:"+error);
        
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAllCategories():Observable<category[]>
  {
    const allCategories = this.angularFireCloudStore
                          .collection<category>(FirebaseCollectionAPI.categories)
                          .snapshotChanges()
                          .pipe(map(result  => result.map(eachdoc =>
                            {
                              const id = eachdoc.payload.doc.id;
                              const payload = eachdoc.payload.doc.data() as category;
                             // console.log(payload);
                              return ({...payload,id:id});
                            }
                          )),catchError(err =>this.handleError(err)));
                         return allCategories;

  }

  getCategoryById(id:string):Observable<category>
  {
    const allCategories = this.angularFireCloudStore
    .collection<category>(FirebaseCollectionAPI.categories).doc(id)
    .snapshotChanges()
    .pipe(map(result  => 
      {
        const id = result.payload.id;
       const payload = result.payload.data() as category;
       console.log(payload);
       return ({...payload,id:id});
      }),catchError(err =>this.handleError(err)));
   return allCategories;
  }
  getAllKavithaiByCatId(catId:string):Observable<Kavithai[]>
  {
    console.log("CatgId is"+catId);
    const allKavithai = this.angularFireCloudStore
                          .collection<Kavithai>(FirebaseCollectionAPI.kavithai, ref => ref.where("category","==",catId))
                          .snapshotChanges()
                          .pipe(map(result  => result.map(eachdoc =>
                            {
                              const id = eachdoc.payload.doc.id;
                              const payload = eachdoc.payload.doc.data() as Kavithai;
                             console.log(payload);
                              return ({...payload,id:id});
                            }
                          )),catchError(err =>this.handleError(err)));
                         return allKavithai;
  }
  

  getKavithaiById(kavithaiId:string):Observable<Kavithai>
  {
    const kavithai = this.angularFireCloudStore
    .collection<Kavithai>(FirebaseCollectionAPI.kavithai).doc(kavithaiId)
    .snapshotChanges()
    .pipe(map(result  => 
      {
        const id = result.payload.id;
       const payload = result.payload.data() as Kavithai;
       console.log(payload);
       return ({...payload,id:id});
      }),catchError(err =>this.handleError(err)));
   return kavithai;
  }

  //create new category into firestore with custom id.
  createCategory(catName:string,catId:string):Promise<any>
  {
    console.log(catName);
    
    const result = this.angularFireCloudStore
    .collection<category>(FirebaseCollectionAPI.categories).doc(catId)
    .set({name:catName,id:catId})
    .then(()=>{
      return true;
    }).catch(err => this.handleError(err));
   return result;
  }

  createNewKavithai(kav:Kavithai):Promise<any>
  {
    const result = this.angularFireCloudStore
    .collection<Kavithai>(FirebaseCollectionAPI.kavithai).add(kav)
    .then(()=>{
      return true;
    }).catch(err => this.handleError(err));
   return result;
  }

}
