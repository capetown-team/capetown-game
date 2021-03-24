import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
import { AppState } from '@/reducers';
import { userSelector } from '@/reducers/user/selectors';
import { changeProfileAvatar } from '@/reducers/user/actions';
import { baseUrl } from '@/constants';
import { FilePopup } from '@/components/FilePopup';
import { ProfileForm } from './ProfileForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';

import './Profile.scss';

const b = block('user-profile');

export const Profile = () => {
  const [isProfileView, setIsProfileView] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => {
    return {
      user: userSelector(state)
    };
  });

  const state = {
    avatar: user?.avatar || '',
    id: user?.id,
    data: {
      first_name: user?.first_name || '',
      second_name: user?.second_name || '',
      display_name: user?.display_name || '',
      email: user?.email || '',
      login: user?.login || '',
      phone: user?.phone || ''
    }
  };

  const handleAvatarChange = (file: File) => {
    dispatch(changeProfileAvatar(file));

    setIsShowPopup(false);
  };

  return (
    <div className={b()}>
      <PageMeta title="Профиль" />
      <div className={b('container')}>
        <div className={b('header')}>
          <div className={b('avatar')}>
            <div className={b('avatar-img')}>
              {state.avatar ? (
                <img src={`${baseUrl}${state.avatar}`} alt="avatar" />
              ) : (
                <span>{state.data.first_name.charAt(0)}</span>
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
              {`${state.data.first_name} ${state.data.second_name}`}
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
