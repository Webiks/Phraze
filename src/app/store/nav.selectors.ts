import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavInterface, RouteDetails } from '../interface/nav.interface';


export const getNavState = createFeatureSelector<NavInterface>('nav');
export const routeSelector = createSelector(getNavState, (state: NavInterface) => state.routeDetails);
export const routePointSelector = createSelector(routeSelector, (route: RouteDetails) => route.routePoints);
export const getShowSearchSelector = createSelector(getNavState, (state: NavInterface) => state.isShowSearch);
export const getActiveNavSelector = createSelector(getNavState, (state: NavInterface) => state.isActiveNav);
export const navFeatureKey = 'nav';
