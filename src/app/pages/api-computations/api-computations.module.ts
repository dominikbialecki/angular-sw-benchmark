import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApiComputationsRoutingModule} from './api-computations-routing.module';
import {ApiComputationsComponent} from './api-computations.component';
import {SharedLazyModule} from '../../shared/shared-lazy.module';

@NgModule({
  declarations: [ApiComputationsComponent],
  imports: [
    CommonModule,
    ApiComputationsRoutingModule,
    SharedLazyModule,
  ]
})
export class ApiComputationsModule {
}
