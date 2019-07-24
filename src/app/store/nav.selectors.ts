import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavInterface } from '../interface/nav.interface';


export const getNavState = createFeatureSelector<NavInterface>('nav');
export const getNav = createSelector(getNavState, (state: NavInterface) => state);
export const navFeatureKey = 'nav';
