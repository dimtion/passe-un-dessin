import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

export const StyledSentenceRecap = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 260px;
  align-items: center;
  margin-bottom: 8px;
`;

StyledSentenceRecap.displayName = 'StyledSentenceRecap';

export const SentenceHeader = styled.div`
  letter-spacing: 0.1em;
  line-height: 24px;
  text-transform: uppercase;
  font-weight: bold;
`;

SentenceHeader.displayName = 'SentenceHeader';

export const Sentence = styled.div<{ color: string }>`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colorPalette.white};
  background-color: ${props => props.color};
  width: 100%;
  border-radius: 16px;
  text-align: center;
`;

Sentence.displayName = 'Sentence';
