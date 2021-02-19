type Func = () => void;

type Props = {
  webkitRequestFullscreen: Func;
  mozRequestFullScreen: Func;
  mozCancelFullScreen: Func;
  webkitExitFullscreen: Func;
};

type HTMLElementFullScreen = HTMLElement & Props;
type DocumentFullScreen = Document & Props;

const fullScreen = (element: HTMLElementFullScreen) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
};

const deactivateFullscreen = (document: DocumentFullScreen) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

export const setWebApi = (
  elementClick: string,
  elementTarget: string,
  messageOn = 'На весь экран',
  messageOff = 'Обычный режим'
) => {
  const toggler: HTMLElement | null = document.getElementById(elementClick);
  const target: HTMLElement | null = document.getElementById(elementTarget);

  if (toggler !== null && target !== null) {
    toggler.addEventListener('click', () => {
      if (toggler.innerHTML === messageOn) {
        toggler.innerHTML = messageOff;
        fullScreen(target as HTMLElementFullScreen);
      } else {
        toggler.innerHTML = messageOn;
        deactivateFullscreen(document as DocumentFullScreen);
      }
    });
  }
};
