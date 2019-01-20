import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../consts/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  getComments() {
    return this.http.get(ENDPOINTS.COMMENTS);
  }

  createComment(comment) {
    return this.http.post(ENDPOINTS.COMMENTS, comment);
  }
}
