import { FontAwesome5 } from '@expo/vector-icons';
import { Spacer, Fab, Text, Center, HStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import ProductListItem from '../../components/ProductListItem';
import SearchBar from '../../components/SearchBar';
import BaseLayout from '../BaseLayout';
import useAuthentication from '../../hooks/useAuthentication';
import useProductStore from '../../stores/ProductStore';

const ProductScreen = ({ navigation }) => {
  const { user, isLoading } = useAuthentication();
  const { userProducts, fetchProductsByUid, deleteProduct } = useProductStore(
    state => state,
  );

  const handleDelete = async (id, uid) => {
    try {
      deleteProduct(id);
      console.log('Deleted product with id: ', id);
      fetchProductsByUid(uid);
    } catch (error) {
      console.error('Error deleting product: ', error.message);
    }
  };

  useEffect(() => {
    if (isLoading || !user) return;

    fetchProductsByUid(user.uid);
  }, [fetchProductsByUid, isLoading, user]);

  if (isLoading) return null;

  return (
    <BaseLayout>
      {user === null ? (
        <Center w="100%" h="96">
          <HStack>
            <Text fontSize={16} fontFamily="NotoSans_500Medium">
              Debe{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{ alignItems: 'flex-start' }}
            >
              <Text
                fontSize={16}
                textDecoration="underline"
                color="primary.200"
                fontFamily="NotoSans_500Medium"
              >
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
            <Text fontSize={16} fontFamily="NotoSans_500Medium">
              {' '}
              para agregar productos.
            </Text>
          </HStack>
        </Center>
      ) : (
        <>
          <SearchBar />
          <Spacer />
          {userProducts.map(({ name, price, id }) => (
            <ProductListItem
              key={id}
              name={name}
              category="Automóviles"
              price={price}
              onDelete={() => handleDelete(id, user.uid)}
              fromSeller
            />
          ))}
          <Fab
            placement="bottom-right"
            colorScheme="blue"
            onPress={() => navigation.navigate('AddProduct')}
            marginBottom={55}
            size="md"
            icon={<FontAwesome5 name="plus" size={20} color="white" />}
          />
        </>
      )}
    </BaseLayout>
  );
};

export default ProductScreen;
