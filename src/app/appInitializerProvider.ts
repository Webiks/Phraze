import { HttpClient } from '@angular/common/http';
import { ConfigCoreService } from './modules/core/service/config-core.service';
import { take } from 'rxjs/operators';
import { IAPPConfig } from './modules/core/config/config.interface';


export function onAppInit(http: HttpClient, configService: ConfigCoreService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve) => {
      http.get('assets/config.json')
        .pipe(take(1))
        .subscribe((data: { defaultData: IAPPConfig }) => {
          configService.config = data.defaultData;
          console.log(configService.config);
          resolve();
        });
    });
  };
}
