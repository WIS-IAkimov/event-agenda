import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { AppView } from './app.view';


@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule,
  ],
  declarations: [
    AppView,
  ],
  bootstrap: [AppView],
})
export class AppModule {}
