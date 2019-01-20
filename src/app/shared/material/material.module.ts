import {NgModule} from '@angular/core';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

const MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ]
})
export class MaterialModule {
}
