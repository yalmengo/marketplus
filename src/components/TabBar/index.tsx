import { Center, HStack, Text, Pressable } from 'native-base';

function TabBar({ state, descriptors, navigation }) {
  return (
    <HStack bg="white" alignItems="center" safeAreaBottom shadow={6}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          // eslint-disable-next-line no-nested-ternary
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            opacity={isFocused ? 1 : 0.5}
            py="3"
            flex={1}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Center>
              <options.tabBarIcon size={24} color="black" />
              <Text fontFamily="NotoSans_500Medium" color="black" fontSize="12">
                {label}
              </Text>
            </Center>
          </Pressable>
        );
      })}
    </HStack>
  );
}

export default TabBar;
