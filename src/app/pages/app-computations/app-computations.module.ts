import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppComputationsRoutingModule} from './app-computations-routing.module';
import {AppComputationsComponent} from './app-computations.component';
import {SharedLazyModule} from '../../shared/shared-lazy.module';

@NgModule({
  declarations: [AppComputationsComponent],
  imports: [
    CommonModule,
    AppComputationsRoutingModule,
    SharedLazyModule,
  ]
})
export class AppComputationsModule {
}
