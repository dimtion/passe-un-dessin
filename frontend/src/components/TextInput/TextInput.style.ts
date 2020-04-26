import styled, { css } from 'styled-components';
import { fontSize, colorPalette, fontFamily } from 'stylesheet';

export const StyledTextInput = styled.input<{ hasAdornment: boolean }>`
  background: none;
  padding: 0 24px;
  line-height: 19px;
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
  width: 100%;

  &[readonly] {
    color: ${colorPalette.textGrey};
  }

  ${props =>
    props.hasAdornment &&
    css`
      padding-right: 52px;
    `}
`;

export const AdornmentLocation = styled.div`
  margin-right: 16px;
  height: 24px;
`;

export const InputAndAdornment = styled.div`
  border: 2px solid ${colorPalette.purple};
  border-radius: 16px;
  height: 51px;
  position: relative;
  display: flex;
  align-items: center;
`;
