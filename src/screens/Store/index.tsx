import { createStackNavigator } from '@react-navigation/stack';
import BaseLayout from '../BaseLayout';

// Sub Screens
import ProductScreen from './ProductScreen';
import AddProductScreen from './AddProductScreen';
import useAuthentication from '../../hooks/useAuthentication';

const Stack = createStackNavigator();

function StoreScreen({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ headerShown: true, title: 'Agregar nuevo producto' }}
      />
    </Stack.Navigator>
  );
}

export default StoreScreen;
