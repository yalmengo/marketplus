import { extendTheme, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useFonts from './src/hooks/useFonts';
import colorTheme from './colorTheme';
import useAuthentication from './src/hooks/useAuthentication';
import './firebaseConfig';

// Screens
import InitialScreen from './src/screens/Initial';
import MainScreen from './src/screens/Main';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import MiniGame from './src/screens/MiniGame';

const Stack = createStackNavigator();

const theme = extendTheme({ colors: colorTheme });

export default function App() {
  const [loadingFonts] = useFonts();
  const { user, isLoading } = useAuthentication();

  if (loadingFonts) return null;

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {isLoading ? null : (
          <Stack.Navigator initialRouteName={user ? 'Main' : 'Initial'}>
            <Stack.Screen
              name="Initial"
              component={InitialScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: 'Creación de cuenta' }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: 'Olvide la contraseña' }}
            />
            <Stack.Screen
              name="MiniGame"
              component={MiniGame}
              options={{ title: 'Mini Juego' }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Inicia Sesión' }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
