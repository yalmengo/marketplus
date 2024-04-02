import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Screens
import TabBar from '../../components/TabBar';
import ShopScreen from '../Shop';
import StoreScreen from '../Store';
import AccountScreen from '../Account';
import HomeScreen from '../Home';

const Tab = createBottomTabNavigator();

function tabIcon(route, { color, size }) {
  let iconName;

  if (route.name === 'Explora') {
    iconName = 'home';
  } else if (route.name === 'Lista de deseos') {
    iconName = 'shopping-bag';
  } else if (route.name === 'Publicaciones') {
    iconName = 'store';
  } else if (route.name === 'Cuenta') {
    iconName = 'user-alt';
  }

  return <FontAwesome5 name={iconName} size={size} color={color} />;
}

function MainScreen() {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      initialRouteName="initial"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarIcon: props => tabIcon(route, props),
      })}
    >
      <Tab.Screen
        name="Explora"
        component={HomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="Lista de deseos"
        component={ShopScreen}
        options={{ tabBarLabel: 'Compras' }}
      />
      <Tab.Screen
        name="Publicaciones"
        component={StoreScreen}
        options={{ tabBarLabel: 'Ventas' }}
      />
      <Tab.Screen
        name="Cuenta"
        component={AccountScreen}
        options={{ tabBarLabel: 'Cuenta' }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
