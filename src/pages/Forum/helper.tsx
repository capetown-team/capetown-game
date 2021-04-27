export const getTopicId = () => {
  if (typeof window !== 'undefined') {
    return Number(window.location.pathname.replace('/forum/', ''));
  }

  return undefined;
};
