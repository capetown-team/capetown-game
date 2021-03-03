import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { userSelector } from '@/reducer/auth/selectors';
import { profileSelector } from '@/reducer/profile/selectors';
import { AppState } from '@/reducer';
import { changeProfileAvatar } from '@/reducer/profile/actions';

import { baseUrl } from '@/constants';
import { FilePopup } from '@/components/FilePopup';
import { ProfileForm } from './ProfileForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';

import './Profile.scss';

const b = block('user-profile');

export const Profile = () => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [state, setState] = useState({
    avatar: '',
    id: 0,
    data: {
      first_name: '',
      second_name: '',
      display_name: '',
      email: '',
      login: '',
      phone: ''
    }
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => {
    return {
      user: userSelector(state)
    };
  });

  const { isProfileView } = useSelector((state: AppState) =>
    profileSelector(state)
  );

  useEffect(() => {
    if (!user) return;

    setState({
      avatar: user.avatar ?? '',
      id: user.id,
      data: {
        first_name: user.first_name ?? '',
        second_name: user.second_name ?? '',
        display_name: user.display_name ?? '',
        email: user.email ?? '',
        login: user.login ?? '',
        phone: user.phone ?? ''
      }
    });
  }, [user]);

  const handleAvatarChange = (file: File) => {
    dispatch(changeProfileAvatar(file));

    setIsShowPopup(false);
  };

  return (
    <div className={b()}>
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
          <ProfileForm profileData={state.data} />
        ) : (
          <ProfilePasswordForm />
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
