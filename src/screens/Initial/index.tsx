import { View, Text } from 'react-native';
import Button from '../../components/Button';

function InitialScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        text="Iniciar Sesión"
        arrow
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        text="Registrarse"
        arrow
        marginY={15}
        onPress={() => navigation.navigate('Register')}
      />
      <Button text="Omitir" onPress={() => navigation.navigate('Main')} />
      <Button
        mt={5}
        text="Abrir Mini Juego"
        onPress={() => navigation.navigate('MiniGame')}
      />
    </View>
  );
}

export default InitialScreen;
