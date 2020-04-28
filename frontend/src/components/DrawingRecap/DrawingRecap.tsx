import React from 'react';
import {
  StyledDrawingRecap,
  ToggleLike,
  ToggleLikeThumb,
  AlreadyLikedThumb,
} from './DrawingRecap.style';
import CanvasDraw from 'react-canvas-draw';
import lzString from 'lz-string';
import { CanvasWrapper } from 'components/WordToDrawingStep/WordToDrawingStep.style';
import { SentenceHeader } from 'components/SentenceRecap/SentenceRecap.style';
import { PadStep } from 'redux/Game/types';
import { useSaveVote, useDeleteVote } from 'redux/Game/hooks';
import { selectPlayer } from 'redux/Player/selectors';
import { useSelector } from 'redux/useSelector';
import { selectAvailableVoteCount } from 'redux/Game/selectors';
import thumb from 'assets/thumb.png';

interface Props {
  step: PadStep;
  enableVote?: boolean | null;
  hidePlayerName?: boolean;
  hideBorder?: boolean;
  width: number;
}

const DrawingRecap: React.FC<Props> = ({ step, enableVote, hidePlayerName, hideBorder, width }) => {
  const player = useSelector(selectPlayer);
  const availableVoteCount = useSelector(selectAvailableVoteCount);

  const liked = !!(player && step.votes.find(vote => vote.player.uuid === player.uuid));
  const displayToggleVote = enableVote && (availableVoteCount > 0 || liked);

  const doSaveVote = useSaveVote();
  const doDeleteVote = useDeleteVote();

  const onLike = () => {
    if (liked) {
      doDeleteVote(step.uuid);
    } else {
      doSaveVote(step.uuid);
    }
  };

  return (
    <StyledDrawingRecap width={width} hidePlayerName={hidePlayerName} hideBorder={hideBorder}>
      {!hidePlayerName && <SentenceHeader>{step.player.name}</SentenceHeader>}
      <CanvasWrapper hideBorder={hideBorder}>
        <CanvasDraw
          disabled
          canvasWidth={width}
          canvasHeight={width}
          hideGrid
          saveData={lzString.decompressFromBase64(step.drawing)}
        />
        {displayToggleVote && (
          <ToggleLike onClick={onLike}>
            <ToggleLikeThumb src={thumb} liked={liked} />
          </ToggleLike>
        )}
        {liked && enableVote && <AlreadyLikedThumb src={thumb} />}
      </CanvasWrapper>
    </StyledDrawingRecap>
  );
};

export default DrawingRecap;
