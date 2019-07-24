import { InjectionToken } from '@angular/core';
import { CoreConfigInterface } from '../interfaces/core.interface';
import { ConfigCoreService } from '../service/config-core.service';

export const  CORE_CONFIG_PROVIDER: InjectionToken<CoreConfigInterface> = new InjectionToken('CORE_CONFIG_PROVIDER');

export function coreConfigFactory(configService: ConfigCoreService, coreDataKey: string) {
  return configService.config[coreDataKey];
}
