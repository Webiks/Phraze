import { InjectionToken } from '@angular/core';
import { BingProviderInterface } from '../interface/bingProvider.interface';
import { ConfigCoreService } from '../../core/service/config-core.service';


export const BINGPROVIDER_CONFIG: InjectionToken<BingProviderInterface> = new InjectionToken('BINGPROVIDER_CONFIG');

export function bingProviderConfigFactory(configService: ConfigCoreService, interceptionConfig: string) {
  return configService.config[interceptionConfig];
}
