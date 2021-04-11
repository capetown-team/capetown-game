import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
import { AppState } from '@/reducers';
import { authSelector, userSelector } from '@/reducers/user/selectors';
import { changeProfileAvatar } from '@/reducers/user/actions';
import { baseUrl } from '@/constants';
import { FilePopup } from '@/components/FilePopup';
import { ProfileForm } from './ProfileForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';

import { formData } from './data';
import './Profile.scss';

const b = block('user-profile');

export const Profile = () => {
  const [isProfileView, setIsProfileView] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: AppState) => {
    return {
      user: userSelector(state),
      isAuth: authSelector(state)
    };
  });

  if (isAuth) {
    formData.first_name.value = user?.first_name || '';
    formData.second_name.value = user?.second_name || '';
    formData.display_name.value = user?.display_name || '';
    formData.email.value = user?.email || '';
    formData.login.value = user?.login || '';
    formData.phone.value = user?.phone || '';
  }

  const state = {
    avatar: user?.avatar || '',
    id: user?.id
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
                <span>{formData.first_name.value}</span>
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
              {`${formData.first_name.value} ${formData.second_name.value}`}
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
            profileData={formData}
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
