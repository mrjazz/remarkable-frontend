export const isMobileView = () => document.body.clientWidth < 800;

export const formatTitle = (s) => {
  if (s.substr(-3).toLowerCase() == '.md') {
      return s.substring(0, s.length-3);
  }
  return s;
}