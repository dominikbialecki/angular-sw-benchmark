import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'api', loadChildren: './pages/api-computations/api-computations.module#ApiComputationsModule' },
  { path: 'app', loadChildren: './pages/app-computations/app-computations.module#AppComputationsModule' },
  { path: '', pathMatch: 'full', redirectTo: 'api' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
