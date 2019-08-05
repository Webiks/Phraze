import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { distanceToEndpointSelector } from '../../store/nav.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-instructions-display',
  templateUrl: './instructions-display.component.html',
  styleUrls: ['./instructions-display.component.scss']
})
export class InstructionsDisplayComponent implements OnInit {
  distanceToEndpoint$;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.distanceToEndpoint$ = this.store.pipe(select(distanceToEndpointSelector),
      tap((x) => console.log(x)));
  }

}
