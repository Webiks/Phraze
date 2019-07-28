import { Action } from '@ngrx/store';


export enum navActionTypes {
  SET_ROUTE = 'SET ROUTE',
  SET_ACTIVE_NAV = 'SET ACTIVE NAV',
  SET_SHOW_SEARCH = 'SET SHOW SEARCH'
}

export interface SetRoutePayload {points: [[]]; }
export class SetRouteAction implements Action {
  type = navActionTypes.SET_ROUTE;
  constructor(public payload: SetRoutePayload) {
  }
}

export interface SetActiveNavPayload {isActiveNav: boolean; }
export class SetActiveNavAction implements Action {
  type = navActionTypes.SET_ACTIVE_NAV;
  constructor(public payload: SetActiveNavPayload) {
  }
}

export interface SetShowSearchPayload { isShowSearch: boolean; }
export class SetShowSearchAction implements Action {
  type = navActionTypes.SET_SHOW_SEARCH;
  constructor(public payload: SetShowSearchPayload) {

  }
}

export type NavActions = SetRouteAction | SetActiveNavAction | SetShowSearchAction;
