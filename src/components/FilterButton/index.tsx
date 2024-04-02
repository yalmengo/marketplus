import { Box, HStack, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

export type Props = {
  onClick?: unknown;
};

const FilterButton = (props: Props) => {
  return (
    <Box
      minW="12"
      alignItems="center"
      justifyContent="center"
      rounded="lg"
      bgColor="black"
    >
      <Ionicons name="filter" size={24} color="white" />
    </Box>
  );
};

export default FilterButton;
