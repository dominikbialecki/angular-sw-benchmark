import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Comment} from '../../api/models/comment';
import {CommentsService} from '../../api/services/comments.service';
import {HttpParams} from '@angular/common/http';
import {RouterService} from '../../shared/router.service';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Params} from '@angular/router';

@Component({
  selector: 'app-app-computations',
  templateUrl: './app-computations.component.html',
  styleUrls: ['./app-computations.component.scss']
})
export class AppComputationsComponent implements OnInit, OnDestroy {

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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = ((data, filter) => data.email ? data.email.includes(filter) : false);
    this.getComments();
  }

  private subscribeToDataFiltersChanges() {
    merge(this.paginator.page, this.sort.sortChange, this.filterChanges$)
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(200)
      )
      .subscribe(() => this.setQueryParams(this.getQueryParams()));

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

  private getComments(params?: HttpParams) {
    this.commentsService.getComments(params).subscribe(
      (comments: Comment[]) => this.dataSource.data = comments,
      (e) => console.error(e)
    );
  }

  applyFilter(filterValue: string) {
    this.filterChanges$.next(filterValue);
    this.dataSource.filter = filterValue;
  }

  goToApiComments() {
    this.routerService.goToApiComputationsComments();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
