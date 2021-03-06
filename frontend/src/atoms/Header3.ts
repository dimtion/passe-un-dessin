import styled from 'styled-components';
import { fontFamily, fontSize } from 'stylesheet';

const Header3 = styled.h3`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.header3};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

Header3.displayName = 'Header3';

export default Header3;
