import React, { useEffect, useState } from 'react';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';

import './PhotoPopup.scss';

const b = block('photo-popup');

type Props = {
  title: string;
  btnText: string;
  show: boolean;
  onClose: () => void;
  onSubmit: (f: File) => void;
};

const dataURLtoFile = (dataURI: string | null) => {
  if (!dataURI) {
    return null;
  }

  const byteString = atob(dataURI.split(',')[1]);

  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);

  const ia = new Uint8Array(ab);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const file = new File([ia], 'photo', {
    type: mimeString
  });

  return file;
};

export const PhotoPopup = ({
  title,
  btnText,
  show,
  onClose,
  onSubmit
}: Props) => {
  const [validState, setValidState] = useState(true);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const video = document.getElementById('camera-video');

    if (video && video instanceof HTMLVideoElement) {
      setVideoElement(video);
    }

    console.log(show, !cameraStream, !!videoElement, !photo);

    if (show && videoElement && !photo) {
      if (!cameraStream) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            setCameraStream(stream);

            videoElement.srcObject = stream;
            videoElement.play();
          });
      }
    } else if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  }, [show, cameraStream, videoElement, photo]);

  const takePhoto = () => {
    if (!photo) {
      const canvasElement: HTMLElement | null = document.getElementById(
        'photo-canvas'
      );
      if (
        !canvasElement ||
        !(canvasElement instanceof HTMLCanvasElement) ||
        !videoElement
      ) {
        return;
      }

      const context = canvasElement.getContext('2d');

      if (!context) {
        return;
      }

      const width = 320;
      const height = 240;

      canvasElement.width = width;
      canvasElement.height = height;
      context.drawImage(videoElement, 0, 0, width, height);

      const data = canvasElement.toDataURL('image/png');
      setPhoto(data);
      setValidState(true);
    } else {
      setPhoto(null);
    }
  };

  const handleSubmit = () => {
    const file = dataURLtoFile(photo);
    if (file) {
      onSubmit(file);

      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
        setPhoto(null);
      }
    } else {
      setValidState(false);
    }
  };

  return (
    <div className={`${b()} ${!show && 'hidden'}`}>
      <div className={b('box')}>
        <button type="button" className={b('close')} onClick={onClose}>
          X
        </button>
        <h3 className={b('title')}>{title}</h3>
        <div className={b('camera')}>
          {!photo ? (
            <video id="camera-video" className={b('video')}>
              <track kind="captions" />
            </video>
          ) : (
            <img className={b('photo')} src={photo} alt="Your" />
          )}
        </div>
        <canvas id="photo-canvas" className={b('canvas')} />
        <div className={b('btn')}>
          <Button type="button" size="m" onClick={takePhoto}>
            {!photo ? 'Сделать снимок' : 'Переснять'}
          </Button>
        </div>
        <div className={b('btn')}>
          <Button type="button" size="m" onClick={handleSubmit}>
            {btnText}
          </Button>
        </div>
        <div className={b('invalid')} hidden={validState}>
          Необходимо сделать снимок
        </div>
      </div>
    </div>
  );
};
