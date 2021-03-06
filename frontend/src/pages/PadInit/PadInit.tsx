import React, { useState } from 'react';
import { useSelector } from 'redux/useSelector';
import { useParams } from 'react-router';

import { useSavePad } from 'redux/Game/hooks';
import {
  StyledHeader,
  PadInitContainer,
  StyledTextInput,
  StyledForm,
  InputArrow,
} from './PadInit.style';
import PlayerChip from 'atoms/PlayerChip';
import { StyledPlayerChips } from 'components/DrawingToWordStep/DrawingToWordStep.style';

import { selectGame, selectRemainingPlayers } from 'redux/Game/selectors';
import { selectPlayer } from 'redux/Player/selectors';
import { FormattedMessage, useIntl } from 'react-intl';
import Spacer from 'atoms/Spacer';
import SuggestionGenerator from 'components/SuggestionGenerator';
import StaticInput from 'components/StaticInput';
import InputLoader from 'components/InputLoader';

const PadInit: React.FunctionComponent = () => {
  const { padId } = useParams();
  const game = useSelector(selectGame);

  const player = useSelector(selectPlayer);
  const remainingPlayers = useSelector(selectRemainingPlayers);
  const intl = useIntl();

  const [sentence, setSentence] = useState<string>('');
  const [{ loading }, doSavePad] = useSavePad();

  const pad = game?.pads.find(pad => pad.uuid === padId);

  if (!game) return null;
  if (!pad) return null;
  if (!player) return null;

  const nextPlayer = pad.steps[0].player;
  const isNextPlayerMe = nextPlayer.uuid === player.uuid;

  const onSubmit = (event: React.MouseEvent | React.FormEvent) => {
    event.preventDefault();
    if (sentence !== '' && !loading) {
      doSavePad({ pad, sentence });
    }
  };

  return (
    <PadInitContainer>
      <StyledHeader>
        <FormattedMessage id="padInit.chooseSentence" />
      </StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        {pad.sentence ? (
          <StaticInput>{pad.sentence}</StaticInput>
        ) : (
          <StyledTextInput
            autoFocus
            type="text"
            placeholder={intl.formatMessage({ id: 'padInit.placeholder' })}
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            adornment={loading ? <InputLoader /> : <InputArrow alt="Valider" onClick={onSubmit} />}
          />
        )}
      </StyledForm>
      {isNextPlayerMe ? (
        <p>
          <FormattedMessage
            id="padInit.youDraw"
            values={{ strong: (...chunks: string[]) => <strong>{chunks}</strong> }}
          />
        </p>
      ) : (
        <p>
          <FormattedMessage
            id="padInit.nextPlayer"
            values={{
              strong: (...chunks: string[]) => <strong>{chunks}</strong>,
              name: nextPlayer.name,
            }}
          />
        </p>
      )}
      <SuggestionGenerator onSuggestionClick={setSentence} />
      <Spacer />
      <em>
        <FormattedMessage id="padInit.waitingFor" />
      </em>
      <StyledPlayerChips>
        {remainingPlayers.map(player => (
          <PlayerChip key={player.uuid} color={player.color}>
            {player.name}
          </PlayerChip>
        ))}
      </StyledPlayerChips>
    </PadInitContainer>
  );
};

export default PadInit;
