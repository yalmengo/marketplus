import { useState } from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import { Button, FormControl, Input, Stack, useToast } from 'native-base';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import BaseLayout from '../BaseLayout';

const auth = getAuth();

const ForgotPasswordScreen = ({ navigation }) => {
  const [error, setError] = useState('');
  const toast = useToast();

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast.show({
        description:
          'La solicitud de restablecimiento de contraseña se ha enviado correctamente',
      });
      setError('');
      navigation.navigate('Login');
    } catch (e) {
      // Ocurrió un error al enviar la solicitud de restablecimiento de contraseña
      setError(
        'Ha ocurrido un error. Verifica que la dirección de correo electrónico sea correcta e inténtalo de nuevo.',
      );
    }
  };

  return (
    <BaseLayout p="4">
      <View>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleForgotPassword}
          validate={values => {
            const errors: Record<string, string> = {};
            if (!values.email) {
              errors.email = 'Ingresa tu dirección de correo electrónico';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'La dirección de correo electrónico no es válida';
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <FormControl isRequired>
                <Stack mx={2}>
                  <FormControl.Label fontFamily="NotoSans_500Medium">
                    Correo electrónico
                  </FormControl.Label>
                  <Input
                    p={2}
                    placeholder="Ingresa tu dirección de correo"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email ? (
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  ) : null}
                </Stack>
              </FormControl>
              <Button
                mb={10}
                mt={5}
                onPress={
                  handleSubmit as unknown as (e: GestureResponderEvent) => void
                }
              >
                Enviar
              </Button>
            </View>
          )}
        </Formik>
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      </View>
    </BaseLayout>
  );
};

export default ForgotPasswordScreen;
