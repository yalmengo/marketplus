import {
  View,
  Text,
  Stack,
  FormControl,
  Input,
  HStack,
  Spacer,
  Button,
  IconButton,
  Icon,
} from 'native-base';
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import BaseLayout from '../BaseLayout';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_500Medium',
    color: 'gray',
  },
});

const auth = getAuth();

function LoginScreen({ navigation }: { navigation: any }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Login successful
        console.log(`Login successful ${userCredential.user.email}`);
        navigation.navigate('Main');
      })
      .catch(error => {
        // Handle login error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <BaseLayout p="4">
      <Text style={styles.text} fontSize={16}>
        Bienvenido a Market+
      </Text>
      <Spacer size={2} />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <FormControl isRequired>
              <Stack mx={2}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Email
                </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Ingresa tu dirección de correo"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {/* <FormControl.ErrorMessage>
                    Ha ocurrido un error
                  </FormControl.ErrorMessage> */}
              </Stack>
            </FormControl>
            <FormControl>
              <Stack mx={2} mb={6}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Contraseña
                </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Ingresa tu contraseña"
                  type={showPassword ? 'text' : 'password'}
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  InputRightElement={
                    <IconButton
                      icon={
                        <Icon
                          name={showPassword ? 'eye' : 'eye-off'}
                          as={Ionicons}
                          color="trueGray.400"
                        />
                      }
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  value={values.password}
                />
              </Stack>
            </FormControl>
            <Button
              variant="unstyled"
              fontFamily="NotoSans_500Medium"
              textAlign="left"
              color="gray.300"
              my={5}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              ¿Olvidaste tu contraseña?
            </Button>

            <Button
              mb={10}
              onPress={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            >
              Iniciar Sesión
            </Button>
            <HStack>
              <Text fontFamily="NotoSans_500Medium" color="gray.300">
                ¿No tienes cuenta?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{ alignItems: 'flex-start' }}
              >
                <Text color="black" fontFamily="NotoSans_500Medium">
                  Regístrate
                </Text>
              </TouchableOpacity>
            </HStack>
          </View>
        )}
      </Formik>
    </BaseLayout>
  );
}

export default LoginScreen;
