import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CommentsService} from '../../api/services/comments.service';
import {Comment} from '../../api/models/comment';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-api-computations',
  templateUrl: './api-computations.component.html',
  styleUrls: ['./api-computations.component.scss']
})
export class ApiComputationsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['email', 'name', 'body'];
  dataSource = new MatTableDataSource<Comment>();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  constructor(private commentsService: CommentsService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = ((data, filter) => data.email ? data.email.includes(filter) : false);
    this.getComments();
  }

  private getComments(params?: HttpParams) {
    this.commentsService.getComments(params).subscribe(
      (comments: Comment[]) => this.dataSource.data = comments,
      (e) => console.error(e)
    );
  }

  goToAppComments() {
    this.router.navigateByUrl('app/comments');
  }
}
