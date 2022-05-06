import css from 'styled-jsx/css';

const serverStyles = css`
  @import 'rem';
  @import 'color';

  .Server {
    display: flex;
    height: rem(60px);

    &__Status {
      width: rem(20px);
      height: 100%;
      margin-right: rem(12px);
      display: flex;
      align-items: center;
    }

    &__Indicator {
      height: rem(16px);
      width: rem(16px);
      border-radius: rem(4px);
    }

    &__Info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      & > :nth-child(1) {
        font-size: rem(18px);
      }

      & > :nth-child(2) {
        font-size: rem(14px);
        color: color(grey);
      }

      & > * {
        margin-bottom: 0;
        line-height: rem(25px);
      }
    }

    &__Started {
      background: color(ui, green);
    }

    &__Stopped {
      background: color(ui, red);
    }

    &__Others {
      background: color(ui, yellow);
    }
  }
`;

const serverSkeletonStyles = css`
  @import 'rem';
  @import 'color';

  .Dummy .Server {
    &__Indicator {
      background-color: color(grey, progressbar-bg);
    }

    &__Info {
      & > * {
        height: rem(19px);
        width: 50%;
        margin-bottom: rem(8px);
        background-color: color(grey, progressbar-bg);
        color: color(grey, progressbar-bg);
      }
    }
  }
`;

export { serverStyles, serverSkeletonStyles };
