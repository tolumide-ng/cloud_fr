import css from 'styled-jsx/css';

const storagePageStyles = css`
  @import 'rem';
  @import 'color';

  li {
    width: 100%;
    margin-bottom: rem(8px);

    span {
      color: color(grey);
    }
  }

  .Dummy {
    li {
      width: 80%;
      background-color: color(grey, progressbar-bg);
      height: rem(19px);
    }
  }
`;

export { storagePageStyles };
