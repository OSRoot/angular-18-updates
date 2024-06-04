import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors,} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
// import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { jwtInterceptorFn } from './shared/interceptors/new.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    LazyLoadImageModule,
    IonicStorageModule.forRoot({
      name:'hotel-app',
      driverOrder:[cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    BrowserAnimationsModule,
    ColorPickerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks},
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  provideHttpClient(withInterceptors([jwtInterceptorFn])),
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
