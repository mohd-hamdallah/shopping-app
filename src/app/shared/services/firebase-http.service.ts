import { Response } from '@angular/http';
import { Http } from '@angular/http/src/http';
import { Observable } from 'rxjs/Observable';

import { Identifiable } from '../models/Identfiable.model';
import { LocalStorgrUtil } from './../utils/local-storge.util';

export abstract class FirebaseHttpService<T extends Identifiable> {
  private static baseUrl = 'https://fir-demo-524e3.firebaseio.com';
  private url: string;

  constructor(
    private endpoint,
    private http: Http
  ) {
      this.url = `${FirebaseHttpService.baseUrl}/${this.endpoint}.json`;
  }

  abstract transformFirebaseEntityToObject(init): T;

  transformObjectToFirebaseEntity(t: T): any {
    return t;
  }
  getAll(): Observable<T[]> {
    return this.http.get(this.url, this.options)
      .map((response: Response) => response.json())
      .map(collection => this.transformFirebaseCollectionToArray(collection));
  }

  getAllByProperty(propertyName: string, propertyValue: string): Observable<T[]> {
    return this.http.get(this.url, {
      params: {
        ...this.options.params,
        orderBy: `"${propertyName}"`,
        equalTo: `"${propertyValue}"`
      }
    }).map((response: Response) => response.json())
    .map((rl) => {
      console.log(rl);
      return rl;
    })
    .map(collection => this.transformFirebaseCollectionToArray(collection));
  }

  getById(id: string): Observable<T> {
    return this.http.get(this.entityUrl(id), this.options)
      .map((response: Response) => response.json())
      .map(response => {
        return this.transformFirebaseEntityToObject(
          {...response, id: id}
        );
      });
  }

  add(entity: T): Observable<string> {
    return this.http.post(
      this.url,
      this.transformObjectToFirebaseEntity(entity)
    ).map(response => response.json().name);
  }

  update(t: T): Observable<T> {
    return this.http.put(
      this.entityUrl(t.id),
      this.transformObjectToFirebaseEntity(t)
    ).map(response => response.json());
  }

  delete(t: T): Observable<void> {
    return this.http.delete(this.entityUrl(t.id))
      .map(reponse => {});
  }

  private entityUrl(id: string) {
    return `${FirebaseHttpService.baseUrl}/${this.endpoint}/${id}.json`;
  }

  private get options() {
    return {
      params: {'auth': LocalStorgrUtil.get('token')}
    };
  }

  private transformFirebaseCollectionToArray(firebaseCollection): T[] {
    const array = [];
    Object.keys(firebaseCollection).forEach(key => {
      array.push(this.transformFirebaseEntityToObject({...firebaseCollection[key], id: key}));
    });
    return array;
  }
}
