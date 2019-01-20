import {Injectable} from '@angular/core';
import {Params, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) {
  }

  public setQueryParams(queryParams: Params): Promise<boolean> {
    return this.router.navigate([], { queryParams, replaceUrl: true });
  }

  goToApiComputationsComments() {
    return this.router.navigate(['api', 'comments']);
  }

  goToAppComputationsComments() {
    return this.router.navigate(['app', 'comments']);
  }
}
