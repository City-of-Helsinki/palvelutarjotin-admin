import useWindowSize from './useWindowSize';

const useIsSmallScreen = () => {
  const windowSize = useWindowSize();
  return windowSize.width && windowSize.width <= 768;
};

export default useIsSmallScreen;
