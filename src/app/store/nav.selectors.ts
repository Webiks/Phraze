import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavInterface, RouteDetails } from '../interface/nav.interface';


export const getNavState = createFeatureSelector<NavInterface>('nav');
export const routeSelector = createSelector(getNavState, (state: NavInterface) => state.routeDetails);
export const routePointSelector = createSelector(routeSelector, (route: RouteDetails) => route.routePoints);
export const getShowSearchSelector = createSelector(getNavState, (state: NavInterface) => state.isShowSearch);
export const getActivePosSelector = createSelector(getNavState, (state: NavInterface) => state.isActivePos);
export const NavInProgressSelector = createSelector(getNavState, (state: NavInterface) => state.isNavInProgress);
export const navFeatureKey = 'nav';
