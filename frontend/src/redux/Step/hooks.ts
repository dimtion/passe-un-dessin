import client from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateStep } from './slice';
import { useCallback } from 'react';
import { PadStep } from 'redux/Game/types';
import { useTypedAsyncFn } from 'services/utils';

export const useFetchStep = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (stepId: string) => {
      const step = await client.get(`/pad-step/${stepId}`);
      dispatch(updateStep(step));
    },
    [dispatch],
  );
};

export const useSaveStepDrawing = () => {
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ step: PadStep; drawing: string }>(
    async ({ step, drawing }) => {
      await client.put(`/pad-step/${step.uuid}/save`, { drawing });
      dispatch(
        updateStep({
          ...step,
          drawing,
        }),
      );
    },
    [dispatch],
  );
};

export const useSaveStepSentence = () => {
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ step: PadStep; sentence: string }>(
    async ({ step, sentence }) => {
      await client.put(`/pad-step/${step.uuid}/save`, { sentence });
      dispatch(
        updateStep({
          ...step,
          sentence,
        }),
      );
    },
    [dispatch],
  );
};
