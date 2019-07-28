import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetShowSearchAction } from '../../store/nav.actions';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  onClickOpenSearch() {
    this.store.dispatch(new SetShowSearchAction({isShowSearch: true}));
  }

}
