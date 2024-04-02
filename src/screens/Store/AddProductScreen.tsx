import { Button, FormControl, Input, Stack, TextArea, View } from 'native-base';
import { Formik } from 'formik';
import { GestureResponderEvent } from 'react-native';
import useProductStore from '../../stores/ProductStore';
import BaseLayout from '../BaseLayout';
import useAuthentication from '../../hooks/useAuthentication';

const AddProductScreen = ({ navigation }) => {
  const { addProduct, fetchProductsByUid } = useProductStore(state => state);
  const { user, isLoading } = useAuthentication();

  if (isLoading) return null;

  const onSubmit = values => {
    addProduct({ ...values, status_id: 1, seller_id: user.uid });
    fetchProductsByUid(user.uid);
    navigation.goBack();
  };

  return (
    <BaseLayout>
      <Formik
        initialValues={{ name: '', price: '', description: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <FormControl isRequired>
              <Stack mx={2}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Nombre
                </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Nombre descriptivo"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </Stack>
              <Stack mx={2}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Precio
                </FormControl.Label>
                <Input
                  p={2}
                  keyboardType="numeric"
                  placeholder="Precio"
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                />
              </Stack>
              <Stack mx={2} mb={6}>
                <FormControl.Label fontFamily="NotoSans_500Medium">
                  Descripción
                </FormControl.Label>
                <TextArea
                  p={2}
                  autoCompleteType=""
                  placeholder="Descripción"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
              </Stack>

              <Button
                mb={10}
                onPress={
                  handleSubmit as unknown as (e: GestureResponderEvent) => void
                }
              >
                Agregar producto
              </Button>
            </FormControl>
          </View>
        )}
      </Formik>
    </BaseLayout>
  );
};

export default AddProductScreen;
