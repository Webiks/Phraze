import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BINGPROVIDER_CONFIG, bingProviderConfigFactory } from './config/bingProvider.config';
import { ConfigCoreService } from '../core/service/config-core.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: 'bingProvider-key', useValue: 'bingProviderConfig'},
    {
      provide: BINGPROVIDER_CONFIG,
      useFactory: bingProviderConfigFactory,
      deps: [ConfigCoreService, 'bingProvider-key' ]
    }
  ]
})
export class ServiceProvidersModule { }
