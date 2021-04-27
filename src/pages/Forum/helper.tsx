export const getTopicId = () => {
  if (window) {
    return Number(window.location.pathname.replace('/forum/', ''));
  }

  return undefined;
};
