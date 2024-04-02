/* eslint-disable camelcase */
import {
  useFonts as useFontsHook,
  NotoSans_500Medium,
  NotoSans_300Light_Italic,
} from '@expo-google-fonts/noto-sans';

const useFonts = () => {
  const [fontsLoaded] = useFontsHook({
    NotoSans_500Medium,
    NotoSans_300Light_Italic,
  });

  return [!fontsLoaded];
};

export default useFonts;
