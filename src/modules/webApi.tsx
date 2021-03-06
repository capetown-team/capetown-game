type Func = () => void;

type Props = {
  webkitRequestFullscreen: Func;
  mozRequestFullScreen: Func;
  mozCancelFullScreen: Func;
  webkitExitFullscreen: Func;
};

export type HTMLElementFullScreen = HTMLDivElement & Props;
export type DocumentFullScreen = Document & Props;

export const setfullScreen = (element: HTMLElementFullScreen) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
};

export const deactivateFullscreen = (document: DocumentFullScreen) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

export const toggelFullScreen = (
  isFullScreenEnabled: boolean,
  target: HTMLElementFullScreen
) => {
  if (isFullScreenEnabled) {
    deactivateFullscreen(document as DocumentFullScreen);
  } else {
    setfullScreen(target);
  }
};
