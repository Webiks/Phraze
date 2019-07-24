import { InjectionToken } from '@angular/core';
import { ConfigCoreService } from '../service/config-core.service';


export const DATA_KEY = new InjectionToken('DATA_KEY');

export function configFactory(configService: ConfigCoreService, dataKey: string) {
  return configService.config[dataKey];
}
