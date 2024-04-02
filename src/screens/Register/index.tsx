import {
  View,
  Text,
  Stack,
  FormControl,
  HStack,
  Input,
  Spacer,
  Button,
} from 'native-base';
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import BaseLayout from '../BaseLayout';

const auth = getAuth();

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_500Medium',
    color: 'gray',
  },
});

function RegisterScreen({ navigation }: { navigation: any }) {
  const handleRegistration = async values => {
    try {
      const { email, password, name, phone } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user } = userCredential;
      // const profileRef = ref(`users/${user.uid}/profile`);
      // TODO: Register phone and more data
      // Update the user's profile data with additional information
      // profileRef
      //   .update({
      //     displayName: 'John Doe',
      //     phoneNumber: '+1234567890',
      //     photoURL: 'https://example.com/profile.jpg',
      //     customData: {
      //       foo: 'bar',
      //       baz: 123,
      //     },
      //   })
      //   .then(() => {
      //     // Update successful
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });

      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          // Update successful
          console.log(
            'User registration successful with display name and phone number',
          );
          navigation.navigate('Main');
        })
        .catch(error => {
          // Handle error
          console.error('Error updating user profile:', error);
        });
    } catch (error) {
      console.log('Error registering user:', error.message);
    }
  };

  return (
    <BaseLayout p="4">
      <Text style={styles.text} fontSize={16}>
        Bienvenido a Market+
      </Text>
      <Text style={styles.text} fontSize={13}>
        Completa los siguientes campos para continuar
      </Text>
      <Spacer size={2} />
      <Formik
        initialValues={{ name: '', email: '', phone: '', password: '' }}
        onSubmit={handleRegistration}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <FormControl isRequired>
              <Stack mx={2}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Nombre Completo
                </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Ingresa tu nombre completo"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {/* <FormControl.ErrorMessage>
                  Ha ocurrido un error
                </FormControl.ErrorMessage> */}
              </Stack>
              <Stack mx={2}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Teléfono
                </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Ingrese tu teléfono"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
              </Stack>
              <Stack mx={2}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Email
                </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Ingresa tu dirección de correo"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </Stack>
              <Stack mx={2} mb={6}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Contraseña
                </FormControl.Label>
                <Input
                  p={2}
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </Stack>

              <Button
                mb={10}
                onPress={
                  handleSubmit as unknown as (e: GestureResponderEvent) => void
                }
              >
                Crear cuenta
              </Button>
            </FormControl>
            <HStack>
              <Text fontFamily="NotoSans_500Medium" color="gray.300">
                ¿Ya tienes cuenta?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{ alignItems: 'flex-start' }}
              >
                <Text color="black" fontFamily="NotoSans_500Medium">
                  Inicia Sesión
                </Text>
              </TouchableOpacity>
            </HStack>
          </View>
        )}
      </Formik>
    </BaseLayout>
  );
}

export default RegisterScreen;
