import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavInterface } from '../interface/nav.interface';


export const getNavState = createFeatureSelector<NavInterface>('nav');
export const getRouteSelector = createSelector(getNavState, (state: NavInterface) => state.route);
export const getShowSearchSelector = createSelector(getNavState, (state: NavInterface) => state.isShowSearch);
export const getActiveNavSelector = createSelector(getNavState, (state: NavInterface) => state.isActiveNav);
export const navFeatureKey = 'nav';
