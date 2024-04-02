import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text, Icon, View, Image, Avatar, Row } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import React from 'react';
import defaultImage from '../../../assets/toyota-prius.png';
import defaultAvatar from '../../../assets/avatar.jpg';
import formatPrice from '../../utils/format';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    margin: 10,
    padding: 15,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 17,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  price: {
    fontSize: 14,
    fontFamily: 'NotoSans_300Light_Italic',
    color: '#666',
  },
  seller: {
    fontSize: 14,
    justifyContent: 'center',
    color: '#666',
  },
  deleteIcon: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 18,
  },
  two_columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export interface ProductListItemProps {
  name: string;
  category: string;
  fromSeller?: boolean;
  image?: string;
  price: number;
  seller?: ImageSourcePropType;
  onDelete?: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  name,
  category,
  price,
  fromSeller = false,
  seller = defaultAvatar,
  onDelete,
}) => {
  // const defaultImage = require('../../../assets/toyota-prius.png');
  return (
    <Box bg="trueGray.200" style={styles.container}>
      <Image
        size={90}
        style={styles.image}
        borderRadius={5}
        resizeMode="cover"
        source={defaultImage}
        alt="Alternate Text"
      />
      <View style={styles.info}>
        <Box style={styles.two_columns}>
          <Text style={styles.name}>{name}</Text>

          {onDelete && (
            <TouchableOpacity onPress={onDelete}>
              <FontAwesome5 name="trash" size={18} style={styles.deleteIcon} />
            </TouchableOpacity>
          )}
        </Box>
        <Text style={styles.category}>{category}</Text>
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.price}>
            {formatPrice(parseInt(price.toString(), 10))}
          </Text>
          <Row style={{ alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>
              {fromSeller ? 'Restantes: ' : 'Vendedor: '}
            </Text>
            {fromSeller ? (
              <Text>7</Text>
            ) : (
              <Avatar
                bg="green.500"
                size="md"
                source={seller}
                style={{ marginRight: 10 }}
              >
                AL
              </Avatar>
            )}
          </Row>
        </Row>
      </View>
    </Box>
  );
};

export default ProductListItem;
