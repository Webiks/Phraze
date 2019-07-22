import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { configFactory, DATA_KEY } from './config/app.config';
import { ConfigCoreService } from './service/config-core.service';
import { CORE_CONFIG_PROVIDER, coreConfigFactory } from './config/core.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: DATA_KEY, useValue: 'defaultData'},
    { provide: 'CORE_CONFIG_DATA_KEY', useValue: 'coreConfig'},
    {
      provide: '',
      useFactory: configFactory,
      deps: [ConfigCoreService, DATA_KEY]
    },
    {
      provide: CORE_CONFIG_PROVIDER,
      useFactory: coreConfigFactory,
      deps: [ConfigCoreService, 'CORE_CONFIG_DATA_KEY']
    }
  ]
})
export class CoreModule { }
