import styled from 'styled-components';
import Header2 from 'atoms/Header2';
import PlayerChips from 'atoms/PlayerChips';
import crossIcon from 'assets/cross.svg';
import { colorPalette } from 'stylesheet';

export const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 16px;
`;

ButtonRow.displayName = 'ButtonRow';

export const StyledHeader = styled(Header2)`
  color: ${colorPalette.purple};
  margin-bottom: 16px;
`;

StyledHeader.displayName = 'StyledHeader';

export const StyledPlayerChips = styled(PlayerChips)`
  margin-bottom: 16px;
`;

StyledPlayerChips.displayName = 'StyledPlayerChips';

export const StyledCrossIcon = styled.img.attrs({ src: crossIcon })`
  margin-left: 8px;
  cursor: pointer;
  position: relative;
  top: -1px;
`;

StyledCrossIcon.displayName = 'StyledCrossIcon';
