import { VStack, Input, Icon } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export interface Props {
  style?: StyleProp<ViewStyle>;
}

function SearchBar({ style }: Props) {
  return (
    <VStack style={style} space={5} alignSelf="center">
      <Input
        placeholder="Buscar publicaciones"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="black"
            as={<FontAwesome5 name="search" size="24" />}
          />
        }
      />
    </VStack>
  );
}

export default SearchBar;
