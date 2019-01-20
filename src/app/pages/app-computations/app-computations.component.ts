import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Comment} from '../../api/models/comment';
import {CommentsService} from '../../api/services/comments.service';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-computations',
  templateUrl: './app-computations.component.html',
  styleUrls: ['./app-computations.component.scss']
})
export class AppComputationsComponent implements OnInit {

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

  goToApiComments() {
    this.router.navigateByUrl('api/comments');
  }
}
