import {
  Box,
  AspectRatio,
  Image,
  Center,
  HStack,
  Stack,
  Heading,
  Text,
  Button,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import defaultImage from '../../../assets/toyota-prius.png';
import { Product } from '../../stores/ProductStore';
import formatPrice from '../../utils/format';

const ProductBoxItem = ({
  name,
  price,
  description,
  onAddToWishlist,
  onWishlist = false,
}: Partial<Product> & {
  onAddToWishlist: () => any;
  // eslint-disable-next-line react/require-default-props
  onWishlist?: boolean;
}) => {
  return (
    <Box alignItems="center" maxW="45%" mb="5">
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={4 / 3}>
            <Image
              size="100%"
              resizeMode="cover"
              source={defaultImage}
              alt="image"
            />
          </AspectRatio>
          <Center position="absolute" top="0" right="0" p={1}>
            <Ionicons
              onPress={onAddToWishlist}
              name={onWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={onWishlist ? 'red' : 'white'}
            />
          </Center>
        </Box>
        <Stack p="3" space={2}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Automóviles
            </Text>
          </Stack>
          <Text fontWeight="400">{description}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400"
              >
                {formatPrice(parseInt(price.toString(), 10))}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductBoxItem;
