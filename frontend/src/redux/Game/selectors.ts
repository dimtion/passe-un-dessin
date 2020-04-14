import { RootState } from 'redux/types';

export const selectGame = (state: RootState) => state.game.game;

export const selectRemainingPlayers = (state: RootState) => state.game.remainingPlayers;