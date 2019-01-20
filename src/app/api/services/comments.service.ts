import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ENDPOINTS} from '../consts/endpoints';
import {Observable} from 'rxjs';
import {Comment} from '../../api/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  getComments(params?: HttpParams): Observable<Comment[]> {
    return this.http.get<Comment[]>(ENDPOINTS.COMMENTS, { params });
  }

  createComment(comment) {
    return this.http.post(ENDPOINTS.COMMENTS, comment);
  }
}
