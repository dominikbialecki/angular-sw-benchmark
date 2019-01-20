import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComputationsComponent} from './api-computations.component';

const routes: Routes = [
  { path: 'comments', component: ApiComputationsComponent },
  { path: '', redirectTo: 'comments' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiComputationsRoutingModule {
}
