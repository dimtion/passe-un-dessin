import styled from 'styled-components';

import rightSideBackground from 'assets/full-background.svg';

import { fontSize, fontFamily, colorPalette } from 'stylesheet';
import Button from 'components/Button';
import Header4 from 'atoms/Header4';
import Header3 from 'atoms/Header3';
import Header2 from 'atoms/Header2';

export const LeftSide = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  flex-direction: column;
  align-items: center;
  padding: 48px;
`;
LeftSide.displayName = 'LeftSide';

export const LeftSideTitle = styled.h1`
  font-family: ${fontFamily.titles};
  font-size: ${fontSize.titles};
  color: ${colorPalette.purple};
  text-transform: uppercase;
  margin-bottom: 16px;
`;

LeftSideTitle.displayName = 'LeftSideTitle';

export const Subtitle = styled(Header4)`
  color: ${colorPalette.orange};
  margin-bottom: 42px;
`;

Subtitle.displayName = 'Subtitle';

export const Header = styled(Header3)`
  color: ${colorPalette.orange};
  margin-bottom: 32px;
  align-self: flex-start;
`;

Header.displayName = 'Header';

export const StartButton = styled(Button)`
  margin-top: 32px;
`;

StartButton.displayName = 'StartButton';

export const Attribution = styled.p`
  text-align: center;
`;

Attribution.displayName = 'Attribution';

export const RightSide = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  flex-direction: column;
  align-items: center;
  background: url(${rightSideBackground});
  background-size: cover;
  position: relative;
  padding: 48px;
`;
RightSide.displayName = 'RightSide';

export const RightSideTitle = styled.h1`
  font-family: ${fontFamily.titles};
  font-size: ${fontSize.XXLarge};
  color: ${colorPalette.white};
  text-transform: uppercase;
  width: 156px;
  word-wrap: break-word;
  text-align: justify;
  margin: auto;
`;

RightSideTitle.displayName = 'RightSideTitle';

export const Credits = styled.p`
  color: ${colorPalette.white};
  font-variant: small-caps;
  text-transform: uppercase;
`;
Credits.displayName = 'Credits';

export const RuleSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

RuleSection.displayName = 'RuleSection';

export const Rule = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`;
Rule.displayName = 'Rule';

export const RuleNumberBackground = styled.div<{ background: string }>`
  background: url(${props => props.background});
  background-size: contain;
  height: 40px;
  width: 40px;
  box-shadow: 0 4px 4px ${colorPalette.blackTransparent};
  margin-right: 16px;
  border-radius: 20px;
  border: 0;
  flex-shrink: 0;
  position: relative;
`;

RuleNumberBackground.displayName = 'RuleNumberBackground';

export const RuleNumber = styled(Header2)`
  position: absolute;
  color: ${colorPalette.white};
  left: 13px;
  bottom: 7px;
`;

RuleNumber.displayName = 'RuleNumber';

export const RuleParagraph = styled.p`
  flex-grow: 1;
`;

RuleParagraph.displayName = 'RuleParagraph';
