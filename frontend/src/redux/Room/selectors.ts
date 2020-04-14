import { RootState } from 'redux/types';

export const selectRoom = (state: RootState) => state.room.room;

export const selectPlayerIsAdmin = (state: RootState) =>
  state.player.player && state.room.room && state.player.player.uuid === state.room.room.admin.uuid;