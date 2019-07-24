import { Action } from '@ngrx/store';


export enum navActionTypes {
  SET_ROUTE = 'SET ROUTE'
}

export interface SetRoutePayload {
  points: [[]];
}

export class SetRouteAction implements Action {
  type = navActionTypes.SET_ROUTE;

  constructor(public payload: SetRoutePayload) {
  }
}

export type NavActions = SetRouteAction;
