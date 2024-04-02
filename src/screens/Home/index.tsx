import {
  Text,
  HStack,
  ScrollView,
  Box,
  Stack,
  VStack,
  useToast,
} from 'native-base';
import { useEffect, useState } from 'react';
import BaseLayout from '../BaseLayout';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import ProductBoxItem from '../../components/ProductBoxItem';
import useProductStore from '../../stores/ProductStore';
import useWishlistStore from '../../stores/WishlistStore';
import useAuthentication from '../../hooks/useAuthentication';

const CATEGORIES = ['Todos', 'Casas', 'Autos', 'Electrónicos', 'Hogar'];

const Tag = ({ isSelected, label, onSelect }) => {
  return (
    <Box
      key={label}
      bgColor={isSelected ? 'black' : 'trueGray.200'}
      px={4}
      py={2}
      mr={2}
      borderRadius={8}
    >
      <Text
        fontSize="16"
        fontFamily="mono"
        onPress={onSelect}
        color={isSelected ? 'white' : 'black'}
      >
        {label}
      </Text>
    </Box>
  );
};

function HomeScreen({ navigation }: { navigation: any }) {
  const { products, fetchProducts } = useProductStore();
  const { addProductToWishlist, isProductInWishlist, initializeWishlist } =
    useWishlistStore(state => state);
  const { user, isLoading } = useAuthentication();
  const toast = useToast();
  const [selected, setSelected] = useState(CATEGORIES[0]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (isLoading || !user) return;

    initializeWishlist(user.uid);
  }, [initializeWishlist, isLoading, user]);

  if (isLoading) return null;

  return (
    <BaseLayout>
      <VStack p="2" space="3">
        <HStack space="5" w="100%">
          <SearchBar style={{ width: '80%' }} />
          <FilterButton />
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(label => (
            <Tag
              isSelected={selected === label}
              label={label}
              key={label}
              onSelect={() => setSelected(label)}
            />
          ))}
        </ScrollView>
        <Stack
          w="100%"
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {products.map(({ name, description, price, id }) => (
            <ProductBoxItem
              key={id}
              name={name}
              price={price}
              description={description}
              onWishlist={isProductInWishlist(id)}
              onAddToWishlist={() => {
                addProductToWishlist(user ? user.uid : 'AN', id).then(() =>
                  toast.show({ description: 'Agregado a la lista de deseos!' }),
                );
              }}
            />
          ))}
        </Stack>
      </VStack>
    </BaseLayout>
  );
}

export default HomeScreen;
