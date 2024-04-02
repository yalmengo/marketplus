import { Box, Text, Center, Flex, HStack, Heading } from 'native-base';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import BaseLayout from '../BaseLayout';
import useAuthentication from '../../hooks/useAuthentication';

const MENU = [
  'Editar Perfil',
  'Mensajes',
  'Sugerencias',
  'Seguridad',
  'Términos y condiciones',
];

function AccountScreen({ navigation }: { navigation: any }) {
  const { user, isLoading } = useAuthentication();

  if (isLoading) return null;

  const userInfo = {
    displayName: user ? user.displayName : 'Anónimo',
    email: user ? user.email : null,
    // TODO: Store Number
    phone: user ? '+1 8298763243' : null,
  };

  return (
    <BaseLayout p="0">
      <Box size="80" w="100%" p="3" bgColor="blue.500">
        <Flex direction="row" justifyContent="space-between">
          <HStack>
            <Center>
              <FontAwesome5 name="user-circle" size={64} />
            </Center>
            <Box p="2">
              <Heading>{userInfo.displayName}</Heading>
              {userInfo.phone ? (
                <Text fontFamily="NotoSans_300Light_Italic">+1 8099991234</Text>
              ) : null}
              {userInfo.email ? (
                <Text fontFamily="NotoSans_300Light_Italic">
                  {userInfo.email}
                </Text>
              ) : null}
            </Box>
          </HStack>
          <Box>
            <Ionicons name="checkmark-circle" size={24} color="black" />
          </Box>
        </Flex>
      </Box>
      <Box mt="-48" h="300">
        <Center>
          <Box bg="white" rounded="lg" shadow="8" w="90%" h={250}>
            {MENU.map(label => (
              <Text
                key={label}
                borderBottomWidth={1}
                borderBottomColor="trueGray.200"
                fontFamily="NotoSans_500Medium"
                p="2"
              >
                {label}
              </Text>
            ))}
            <Text fontFamily="NotoSans_500Medium" p="2" color="primary.100">
              Cerrar sesión
            </Text>
          </Box>
        </Center>
      </Box>
    </BaseLayout>
  );
}

export default AccountScreen;
