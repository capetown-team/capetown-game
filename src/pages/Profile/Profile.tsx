import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { getUserInfo, changeProfileAvatar } from '@/api';
import { FilePopup } from '@/components/FilePopup';
import { ProfileForm } from './ProfileForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';

import './Profile.scss';

const b = block('user-profile');

export const Profile = () => {
  const [isProfileView, setIsProfileView] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [state, setState] = useState({
    avatar: '',
    id: 0,
    data: {
      firstName: '',
      secondName: '',
      displayName: '',
      email: '',
      login: '',
      phone: ''
    }
  });

  const requestProfileData = () => {
    getUserInfo().then(({ data }) => {
      setState({
        avatar: data.avatar,
        id: data.id,
        data: {
          firstName: data.first_name ?? '',
          secondName: data.second_name ?? '',
          displayName: data.display_name ?? '',
          email: data.email ?? '',
          login: data.login ?? '',
          phone: data.phone ?? ''
        }
      });
    });
  };

  useEffect(() => {
    requestProfileData();
  }, []);

  const handleAvatarChange = (file: File) => {
    changeProfileAvatar(file).then(() => {
      setIsShowPopup(false);
      requestProfileData();
    });
  };

  return (
    <div className={b()}>
      <div className={b('container')}>
        <div className={b('header')}>
          <div className={b('avatar')}>
            <div className={b('avatar-img')}>
              {state.avatar ? (
                <img
                  src={`https://ya-praktikum.tech${state.avatar}`}
                  alt="avatar"
                />
              ) : (
                <span>М</span>
              )}
              <button
                onClick={() => setIsShowPopup(true)}
                type="button"
                className={b('avatar-btn')}
              >
                Поменять аватар
              </button>
            </div>
            <div className={b('avatar-name')}>
              {`${state.data.firstName} ${state.data.secondName}`}
            </div>
          </div>
          <div>
            <Link className="chat-link" to="/">
              на главную
            </Link>
          </div>
        </div>
        {isProfileView ? (
          <ProfileForm
            profileData={state.data}
            setIsProfileView={setIsProfileView}
          />
        ) : (
          <ProfilePasswordForm setIsProfileView={setIsProfileView} />
        )}
      </div>
      <FilePopup
        title="Загрузите изображение"
        label="Выберете файл на компьютере"
        btnText="Поменять"
        show={isShowPopup}
        onClose={() => setIsShowPopup(false)}
        onSubmit={handleAvatarChange}
      />
    </div>
  );
};
