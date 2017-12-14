import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Identifiable } from '../models/Identfiable.model';
import { LocalStorgrUtil } from './../utils/local-storge.util';
export abstract class FirebaseHttpService<T extends Identifiable> {
  private static baseUrl = 'https://fir-demo-524e3.firebaseio.com';
  private url: string;

  constructor(
    private endpoint,
    private http: HttpClient
  ) {
      this.url = `${FirebaseHttpService.baseUrl}/${this.endpoint}.json`;
  }

  abstract transformFirebaseEntityToObject(init): T;

  transformObjectToFirebaseEntity(t: T): any {
    return t;
  }
  
  getAll(): Observable<T[]> {
    return this.http.get<T>(this.url, this.options)
      .map(collection => this.transformFirebaseCollectionToArray(collection));
  }

  getAllByProperty(propertyName: string, propertyValue: string): Observable<T[]> {

    return this.http.get<T>(this.url, this.getPropertySearchOptions(propertyName, propertyValue))

      .map(collection => this.transformFirebaseCollectionToArray(collection));
  }

  getById(id: string): Observable<T> {
    return this.http.get(this.entityUrl(id), this.options)
      .map(response => {
        return this.transformFirebaseEntityToObject(
          { ...response, id: id }
        );
      });
  }

  add(entity: T): Observable<string> {
    return this.http.post<T>(
      this.url,
      this.transformObjectToFirebaseEntity(entity)
    ).map(response => response['name']);
  }

  update(t: T): Observable<T> {
    return this.http.put<T>(
      this.entityUrl(t.id),
      this.transformObjectToFirebaseEntity(t)
    );
  }

  delete(t: T): Observable<void> {
    return this.http.delete<T>(this.entityUrl(t.id))
      .map(reponse => { });
  }

  private entityUrl(id: string) {
    return `${FirebaseHttpService.baseUrl}/${this.endpoint}/${id}.json`;
  }

  private get options() {
    return {
      params: new HttpParams().set('auth', LocalStorgrUtil.get('token'))
    };
  }


  private getPropertySearchOptions(propertyName: string, propertyValue: string) {

    const httpParams = this.options.params
      .set('orderBy', `"${propertyName}"`)
      .set('equalTo', `"${propertyValue}"`);

    return { params: httpParams };
  }


  private transformFirebaseCollectionToArray(firebaseCollection): T[] {
    const array = [];
    Object.keys(firebaseCollection).forEach(key => {
      array.push(this.transformFirebaseEntityToObject({ ...firebaseCollection[key], id: key }));
    });
    return array;
  }
}
