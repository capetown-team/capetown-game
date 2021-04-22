export const getTopicId = () => {
  return Number(window.location.pathname.replace('/forum/', ''));
};
