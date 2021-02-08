import React, { memo, FC } from 'react';

import './Loading.scss';

const Loading: FC = () => <p style={{ textAlign: 'center' }}>loading</p>;
const WrappedLoading = memo(Loading);

export { WrappedLoading as Loading };
