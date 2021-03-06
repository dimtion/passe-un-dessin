import client from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateGame, updatePad, setSuggestions, updatePadStep, setWinners } from './slice';
import { Pad } from './types';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { getRedirectPath } from 'services/game.service';
import { DEFAULT_ROUND_DURATION } from './constants';
import { useIntl } from 'react-intl';
import { wait, useTypedAsyncFn } from 'services/utils';
import { useGetRanking } from 'redux/Room/hooks';
import { selectRoom } from 'redux/Room/selectors';
import { selectGame } from './selectors';
import { selectPlayer } from 'redux/Player/selectors';
import { useSelector } from 'redux/useSelector';

export const useFetchGame = () => {
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ gameId: string }>(
    async ({ gameId }) => {
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

  const [, doFetchGame] = useFetchGame();

  return useTypedAsyncFn<{}>(async () => {
    if (!room || !game || !player) return;

    await doFetchGame({ gameId: game.uuid });
    const path = getRedirectPath(room, game, player);
    push(path);
  }, [room, game, player]);
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

export const useGoToVoteResults = () => {
  const history = useHistory();

  return useCallback(
    async (roomId: string, gameId: string) => {
      try {
        await client.put(`/game/${gameId}/go-to-vote-results`);
        history.push(`/room/${roomId}/game/${gameId}/vote-results`);
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [history],
  );
};

export const useGetVoteResults = () => {
  const dispatch = useDispatch();
  const doGetRanking = useGetRanking();

  return useCallback(
    async (gameId: string, roomId: string) => {
      try {
        const response = await client.get(`/game/${gameId}/vote-results`);
        dispatch(setWinners(response['winners']));
        doGetRanking(roomId);
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [dispatch, doGetRanking],
  );
};

export const useSavePad = () => {
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ pad: Pad; sentence: string }>(
    async ({ pad, sentence }) => {
      const updatedPad = await client.put(`/pad/${pad.uuid}/save`, { sentence });
      dispatch(updatePad(updatedPad));
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

export const useSaveVote = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (padStepId: string) => {
      try {
        const updatedStep = await client.post(`/step/${padStepId}/vote`);
        dispatch(updatePadStep(updatedStep));
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [dispatch],
  );
};

export const useDeleteVote = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (padStepId: string) => {
      try {
        const updatedStep = await client.delete(`/step/${padStepId}/vote`);
        dispatch(updatePadStep(updatedStep));
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [dispatch],
  );
};

export const useCheckIfPlayerIsInGame = () => {
  const { push } = useHistory();
  const room = useSelector(selectRoom);

  return useCallback(
    async (gameId: string) => {
      if (!room) return;

      try {
        const response = await client.get(`/game/${gameId}/is-player-in-game`);
        if (response.is_in_game) {
          push(`/room/${room.uuid}/game/${gameId}`);
        }
      } catch (e) {
        alert('Error - see console');
        console.error(e);
      }
    },
    [push, room],
  );
};
