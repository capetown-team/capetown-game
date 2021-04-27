import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
import { AppState } from '@/reducers';
import { authSelector, userSelector } from '@/reducers/user/selectors';
import {
  themesListSelector,
  selectedThemeSelector
} from '@/reducers/theme/selectors';
import { changeProfileAvatar } from '@/reducers/user/actions';
import { getThemesList, changeUserTheme } from '@/reducers/theme/actions';
import { baseUrl } from '@/constants';
import { FilePopup } from '@/components/FilePopup';
import { PhotoPopup } from '@/components/PhotoPopup';
import { ProfileForm } from './ProfileForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';

import { formData } from './data';
import './Profile.scss';

const b = block('user-profile');

export const Profile = () => {
  const [isProfileView, setIsProfileView] = useState(true);
  const [showFilePopup, setShowFilePopup] = useState(false);
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuth, themesList, selectedTheme } = useSelector(
    (state: AppState) => {
      return {
        user: userSelector(state),
        isAuth: authSelector(state),
        themesList: themesListSelector(state),
        selectedTheme: selectedThemeSelector(state)
      };
    }
  );

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

  useEffect(() => {
    dispatch(getThemesList());
  }, [dispatch]);

  const handleAvatarChange = (file: File) => {
    dispatch(changeProfileAvatar(file));

    setShowFilePopup(false);
  };

  const changeThemeHandler = ({ target }: { target: HTMLSelectElement }) => {
    const themeId: number = parseInt(target.value, 10);

    if (user) {
      dispatch(changeUserTheme(user.id, themeId));
    }
  };

  const themeOptionList = themesList.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

  return (
    <div className={b()}>
      <PageMeta title="Профиль" />
      <div className={b('container')}>
        <div className={b('header')}>
          <div className={b('avatar')}>
            <div className={b('avatar-img')}>
              {state.avatar ? (
                <img
                  src={`${baseUrl}/api/v2/resources/${state.avatar}`}
                  alt="avatar"
                />
              ) : (
                <span>{formData.first_name.value}</span>
              )}
              <button
                onClick={() => setShowFilePopup(true)}
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
            <select
              className={b('theme-select')}
              onChange={changeThemeHandler}
              value={selectedTheme}
            >
              {themeOptionList}
            </select>
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
        show={showFilePopup}
        onClose={() => setShowFilePopup(false)}
        onSubmit={handleAvatarChange}
        secondBtnText="Сделать снимок"
        handleSecondClick={() => {
          setShowPhotoPopup(true);
          setShowFilePopup(false);
        }}
      />
      <PhotoPopup
        title="Изменение фотографии"
        btnText="Поменять"
        show={showPhotoPopup}
        onClose={() => setShowPhotoPopup(false)}
        onSubmit={handleAvatarChange}
      />
    </div>
  );
};
