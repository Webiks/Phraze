import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavInterface } from '../interface/nav.interface';


export const getNavState = createFeatureSelector<NavInterface>('nav');
export const getRouteSelector = createSelector(getNavState, (state: NavInterface) => state.route);
export const navFeatureKey = 'nav';
