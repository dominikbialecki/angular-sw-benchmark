import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CommentsService} from '../../api/services/comments.service';
import {Comment} from '../../api/models/comment';
import {RouterService} from '../../shared/router.service';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Params} from '@angular/router';

@Component({
  selector: 'app-api-computations',
  templateUrl: './api-computations.component.html',
  styleUrls: ['./api-computations.component.scss']
})
export class ApiComputationsComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private onDestroy$ = new Subject();
  private filterChanges$ = new BehaviorSubject<String>('');

  displayedColumns: string[] = ['email', 'name', 'body'];
  dataSource = new MatTableDataSource<Comment>();

  constructor(private commentsService: CommentsService,
              private routerService: RouterService,
  ) {
  }

  ngOnInit() {
    this.subscribeToDataFiltersChanges();
    this.getComments();
  }

  private subscribeToDataFiltersChanges() {
    merge(this.paginator.page, this.sort.sortChange, this.filterChanges$)
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(200)
      )
      .subscribe(() => {
        const queryParams = this.getQueryParams();
        this.setQueryParams(queryParams);
        this.getComments(queryParams);
      });

  }

  private getQueryParams() {
    return {
      page: this.paginator.pageIndex || undefined,
      pageSize: this.paginator.pageSize || undefined,
      order: this.sort.direction || undefined,
      email: this.filterChanges$.getValue() || undefined
    };
  }

  private setQueryParams(queryParams: Params) {
    this.routerService.setQueryParams(queryParams);
  }

  private getComments(params?) {
    this.commentsService.getComments(params).subscribe(
      (comments: Comment[]) => this.dataSource.data = comments,
      (e) => console.error(e)
    );
  }

  applyFilter(filterValue: string) {
    this.filterChanges$.next(filterValue);
  }

  goToAppComments() {
    this.routerService.goToAppComputationsComments();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
