import { FontAwesome5 } from '@expo/vector-icons';
import { Fab } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import BaseLayout from '../BaseLayout';
import ProductListItem from '../../components/ProductListItem';
import useWishlistStore from '../../stores/WishlistStore';
import useAuthentication from '../../hooks/useAuthentication';
import useProductStore from '../../stores/ProductStore';

interface Product {
  name: string;
  price: number;
  category: string;
  onDelete: () => any;
}

const mockData: Product[] = [
  {
    name: 'Toyota Yaris 2019',
    category: 'Automóviles',
    price: 99999,
    onDelete: () => console.log('deleted'),
  },
  {
    name: 'Toyota Yaris 2018',
    category: 'Automóviles',
    price: 99999,
    onDelete: () => console.log('deleted'),
  },
  {
    name: 'Toyota Prius 2020',
    category: 'Automóviles',
    price: 99999,
    onDelete: () => console.log('deleted'),
  },
  {
    name: 'Toyota Yaris 2017',
    category: 'Automóviles',
    price: 85665,
    onDelete: () => console.log('deleted'),
  },
  {
    name: 'Sonata',
    category: 'Automóviles',
    price: 97999,
    onDelete: () => console.log('deleted'),
  },
];

function ShopScreen({ navigation }: { navigation: any }) {
  const { user, isLoading } = useAuthentication();
  const fetchProductsByIds = useProductStore(state => state.fetchProductsByIds);
  const { products, getWishlistProducts, removeProductFromWishlist } =
    useWishlistStore(state => state);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (isLoading || !user) return;
    getWishlistProducts(user.uid);
  }, [getWishlistProducts, isLoading, user]);

  useEffect(() => {
    if ((products as string[]).length) {
      fetchProductsByIds(products).then(setProductData);
    } else {
      setProductData([]);
    }
  }, [products, fetchProductsByIds]);

  console.log('wishlist products', products);

  return (
    <BaseLayout>
      {productData.map(props => (
        <ProductListItem
          key={props.name}
          name={props.name}
          category={props.category}
          price={props.price}
          onDelete={() => removeProductFromWishlist(user.uid, props.id)}
        />
      ))}
    </BaseLayout>
  );
}

export default ShopScreen;
