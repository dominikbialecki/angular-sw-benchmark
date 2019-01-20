import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';

const SHARED_MODULES = [
  HttpClientModule,
  CommonModule,
  MaterialModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...SHARED_MODULES,
  ],
  exports: [
    ...SHARED_MODULES,
  ]
})
export class SharedLazyModule {
}
