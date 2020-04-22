import client from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateGame, updatePad, setSuggestions } from './slice';
import { Pad } from './types';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'redux/useSelector';
import { selectGame } from './selectors';
import { selectPlayer } from 'redux/Player/selectors';
import { selectRoom } from 'redux/Room/selectors';
import { getRedirectPath } from 'services/game.service';
import { DEFAULT_ROUND_DURATION } from './constants';
import { useIntl } from 'react-intl';
import { wait } from 'services/utils';

export const useFetchGame = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (gameId: string) => {
      const game = await client.get(`/game/${gameId}`);
      dispatch(updateGame(game));
    },
    [dispatch],
  );
};

export const useGetSuggestions = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  return useCallback(async () => {
    const [, { suggestions }] = (await Promise.all([
      wait(1000),
      client.get(`/suggestions?language=${intl.locale}`),
    ])) as [void, { suggestions: string[] }];
    dispatch(setSuggestions(suggestions));
  }, [dispatch, intl.locale]);
};

export const useRefreshGame = () => {
  const room = useSelector(selectRoom);
  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);
  const { push } = useHistory();

  const doFetchGame = useFetchGame();

  return useCallback(async () => {
    if (!game || !room || !player) return;

    await doFetchGame(game.uuid);
    const path = getRedirectPath(room, game, player);
    push(path);
  }, [game, room, player, doFetchGame, push]);
};

export const useStartGame = () => {
  const history = useHistory();

  return useCallback(
    async (roomId: string, roundDuration?: number, playersOrder?: string[] | null) => {
      try {
        const { game_id: gameId } = await client.put(`/room/${roomId}/start`, {
          roundDuration,
          playersOrder,
        });
        if (roundDuration) {
          localStorage.setItem('preferredRoundDuration', roundDuration.toString());
        }
        history.push(`/room/${roomId}/game/${gameId}`);
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [history],
  );
};

export const useSavePad = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (pad: Pad, sentence: string) => {
      try {
        const updatedPad = await client.put(`/pad/${pad.uuid}/save`, { sentence });
        dispatch(updatePad(updatedPad));
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [dispatch],
  );
};

export const useReviewPad = () => {
  return useCallback(async (pad: Pad) => {
    try {
      await client.put(`/pad/${pad.uuid}/review`, {});
    } catch (e) {
      alert('Error - see console');
      console.error(e);
    }
  }, []);
};

export const useRoundDuration = (initialValue?: number | null) => {
  const preferredRoundDurationStr = localStorage.getItem('preferredRoundDuration');
  const preferredRoundDuration = preferredRoundDurationStr
    ? parseInt(preferredRoundDurationStr)
    : null;

  return useState<number>(initialValue || preferredRoundDuration || DEFAULT_ROUND_DURATION);
};
