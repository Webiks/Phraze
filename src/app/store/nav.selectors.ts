import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavInterface, RouteDetails } from '../interface/nav.interface';


export const getNavState = createFeatureSelector<NavInterface>('nav');
export const routeDetailsSelector = createSelector(getNavState, (state: NavInterface) => state.routeDetails);
export const routePointsSelector = createSelector(routeDetailsSelector, (route: RouteDetails) => route.routePoints);
export const getShowSearchSelector = createSelector(getNavState, (state: NavInterface) => state.isShowSearch);
export const phrazeStateSelector = createSelector(getNavState, (state: NavInterface) => state.phrazeState);
export const currentPositionSelector = createSelector(getNavState, (state: NavInterface) => state.currentPosition);
export const nextWaypointIndexSelector = createSelector(getNavState, (state: NavInterface) => state.nextWaypointIndex);
export const nextWaypointDistanceSelector = createSelector(getNavState, (state: NavInterface) => state.nextWaypointDistance);
export const distanceToEndpointSelector = createSelector(getNavState, (state: NavInterface) => state.distanceToEndpoint);
export const nextWaypointManeuverTypeSelector = createSelector(getNavState, (state: NavInterface) => state.nextWaypointManeuverType);
export const nextWaypointNameSelector = createSelector(getNavState, (state: NavInterface) => state.nextWaypointName);
export const navFeatureKey = 'nav';
