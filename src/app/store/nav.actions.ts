import { Action } from '@ngrx/store';


export enum navActionTypes {
  SET_ROUTE = 'SET ROUTE'
}

export interface SetRoutePayload { points: [[], []]; }
export class SetRoute implements Action {
  type = navActionTypes.SET_ROUTE;
  constructor(public payload: SetRoutePayload) {}
}

export const navActions = {
  SetRoute
};

export type NavActions = SetRoute;
