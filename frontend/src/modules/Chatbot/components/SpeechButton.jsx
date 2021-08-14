import styled, { css } from 'styled-components';
import defaultTheme from '../theme';
import { pulse } from '../common/animations';
import { IconButton } from '@material-ui/core'

const fillFunc = props => {
  const { speaking, invalid, theme } = props;

  if (speaking) {
    return theme.botBubbleColor;
  }
  return invalid ? '#E53935' : '#4a4a4a';
};


const SpeechButton = styled(IconButton)`
  fill: ${fillFunc};
  &:before {
    content: '';
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    animation: ${({ theme, speaking }) =>
    speaking
      ? css`
            ${pulse(theme.botBubbleColor)} 2s ease infinite
          `
      : ''};
  }
  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

SpeechButton.defaultProps = {
  theme: defaultTheme
};

export default SpeechButton;
