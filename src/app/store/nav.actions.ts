import { Action } from '@ngrx/store';
import { RouteDetails } from '../interface/nav.interface';


export enum navActionTypes {
  SET_ROUTE = 'SET ROUTE',
  SET_ACTIVE_POS = 'SET ACTIVE POS',
  SET_SHOW_SEARCH = 'SET SHOW SEARCH',
  SET_NAV_IN_PROGRESS = 'SET NAV IN PROGRESS'
}

export interface SetRoutePayload {routeDetails: RouteDetails; }
export class SetRouteAction implements Action {
  type = navActionTypes.SET_ROUTE;
  constructor(public payload: SetRoutePayload) {
  }
}

export interface SetActivePosPayload {isActivePos: boolean; }
export class SetActivePosAction implements Action {
  type = navActionTypes.SET_ACTIVE_POS;
  constructor(public payload: SetActivePosPayload) {
  }
}

export interface SetShowSearchPayload { isShowSearch: boolean; }
export class SetShowSearchAction implements Action {
  type = navActionTypes.SET_SHOW_SEARCH;
  constructor(public payload: SetShowSearchPayload) {

  }
}

export interface SetNavInProgressPayload {isNavInProgress: boolean; }
export class SetNavInProgressAction implements Action {
  type = navActionTypes.SET_NAV_IN_PROGRESS;
  constructor(public payload: SetNavInProgressPayload) {
  }
}

export type NavActions =  SetRouteAction |
                          SetActivePosAction |
                          SetShowSearchAction |
                          SetNavInProgressAction;
