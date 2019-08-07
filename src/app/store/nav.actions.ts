import { Action } from '@ngrx/store';
import { PhrazeState, RouteDetails } from '../interface/nav.interface';


export enum navActionTypes {
  SET_ROUTE = 'SET ROUTE',
  SET_PHRAZE_STATE = 'SET PHRAZE STATE',
  SET_SHOW_SEARCH = 'SET SHOW SEARCH',
  SET_CURRENT_POSITION = 'SET CURRENT POSITION',
  SET_NEXT_WAYPOINT_INDEX = 'SET NEXT WAYPOINT INDEX',
  SET_NEXT_WAYPOINT_DISTANCE = 'SET NEXT WAYPOINT DISTANCE',
  SET_DISTANCE_TO_ENDPOINT = 'SET DISTANCE TO ENDPOINT',
  SET_IS_NEXT_WP_NOTIFIED = 'SET IS NEXT WP NOTIFIED',
  PLAY_VOICE_WP_NOTIFICATION = 'PLAY VOICE WP NOTIFICATION'
}

export interface SetRoutePayload {routeDetails: RouteDetails; }
export class SetRouteAction implements Action {
  type = navActionTypes.SET_ROUTE;
  constructor(public payload: SetRoutePayload) {
  }
}

export interface SetPhrazeStatePayload {phrazeState: PhrazeState; }
export class SetPhrazeStateAction implements Action {
  type = navActionTypes.SET_PHRAZE_STATE;
  constructor(public payload: SetPhrazeStatePayload) {
  }
}

export interface SetShowSearchPayload { isShowSearch: boolean; }
export class SetShowSearchAction implements Action {
  type = navActionTypes.SET_SHOW_SEARCH;
  constructor(public payload: SetShowSearchPayload) {
  }
}

export interface SetCurrentPositionPayload {currentPosition: {latitude: number, longitude: number}; }
export class SetCurrentPositionAction implements Action {
  type = navActionTypes.SET_CURRENT_POSITION;
  constructor(public payload: SetCurrentPositionPayload) {
  }
}

export interface SetNextWaypointOndexPayload {nextWaypointIndex: number; }
export class SetNextWaypointIndexAction implements Action {
  type = navActionTypes.SET_NEXT_WAYPOINT_INDEX;
  constructor(public payload: SetNextWaypointOndexPayload) {
  }
}

export interface SetNextWaypointDistancePayload {nextWaypointDistance: number; }
export class SetNextWaypointDistanceAction implements Action {
  type = navActionTypes.SET_NEXT_WAYPOINT_DISTANCE;
  constructor(public payload: SetNextWaypointDistancePayload) {
  }
}

export interface SetDistanceToEndpointPayload {distanceToEndpoint: number; }
export class SetDistanceToEndpointAction implements Action {
  type = navActionTypes.SET_DISTANCE_TO_ENDPOINT;
  constructor(public payload: SetDistanceToEndpointPayload) {
  }
}

export interface SetIsNextWpNotifiedPayload {isNextWpNotified: boolean; }
export class SetIsNextWpNotifiedAction implements Action {
  type = navActionTypes.SET_IS_NEXT_WP_NOTIFIED;
  constructor(public payload: SetIsNextWpNotifiedPayload) {
  }
}

export interface PlayVoiceWpNotificationPayload {distanceNotification: number; }
export class PlayVoiceWpNotificationAction implements Action {
  type = navActionTypes.PLAY_VOICE_WP_NOTIFICATION;
  constructor(public payload: PlayVoiceWpNotificationPayload) {
  }
}

export type NavActions =  SetRouteAction |
                          SetPhrazeStateAction |
                          SetShowSearchAction |
                          SetCurrentPositionAction |
                          SetNextWaypointIndexAction |
                          SetNextWaypointDistanceAction |
                          SetDistanceToEndpointAction |
                          SetIsNextWpNotifiedAction |
                          PlayVoiceWpNotificationAction;
