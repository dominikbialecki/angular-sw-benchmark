import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComputationsComponent} from './app-computations.component';

const routes: Routes = [
  { path: 'comments', component: AppComputationsComponent },
  { path: '', redirectTo: 'comments' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppComputationsRoutingModule {
}
