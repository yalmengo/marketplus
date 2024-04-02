import { Button as ButtonNative, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { InterfaceButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 20,
    width: 293,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'NotoSans_500Medium',
  },
});

export interface Button extends InterfaceButtonProps {
  children?: string;
  text?: string;
  arrow?: boolean;
}

function Button({ children, arrow = false, text, ...props }: Button) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonNative style={styles.button} {...props}>
      <Text style={styles.buttonText}>
        {text ?? children}{' '}
        {arrow ? (
          <>
            {' '}
            <AntDesign name="arrowright" size={20} color="white" />
          </>
        ) : null}
      </Text>
    </ButtonNative>
  );
}

export default Button;
