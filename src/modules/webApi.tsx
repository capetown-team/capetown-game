import { RefObject } from 'react';

type Func = () => void;

type Props = {
  webkitRequestFullscreen: Func;
  mozRequestFullScreen: Func;
  mozCancelFullScreen: Func;
  webkitExitFullscreen: Func;
};

type HTMLElementFullScreen = HTMLElement & Props;

const fullScreen = (element: HTMLElementFullScreen) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
};

export const setWebApi = (elementTarget: RefObject<unknown>) => {
  const target = elementTarget.current;
  fullScreen(target as HTMLElementFullScreen);
};
