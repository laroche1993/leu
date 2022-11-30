import { View, StyleSheet, TextInput as DefaultTextInput, StyleProp, TextStyle } from 'react-native';
import { COLORS, SIZES } from '../theme';
import Text from './Text';

type Props = {
  label?: string;
  style: StyleProp<TextStyle>
};
type InputProps = DefaultTextInput['props'] & Props;

function TextArea(props: InputProps) {
  const { label, maxLength, value,style, ...otherProps } = props;
  const max = maxLength ? maxLength : 150;
  const length = value ? value.length : 0;
  const charactes = max - length;
  return (
    <>
    {label && (
        <View style={styles.label}>
          {label && <Text primary style={{marginVertical: 8}}>{label}</Text>}
          <Text h4 style={{ marginStart: 32 }}>{`${charactes} car. restantes`}</Text>
        </View>
      )}
    <View style={styles.container}>
      <DefaultTextInput
        autoCapitalize={'sentences'}
        spellCheck={false}
        autoCorrect={false}
        multiline={true}
        numberOfLines={6}
        maxLength={150}
        placeholderTextColor={COLORS.white}
        style={[styles.TextInput, style]}
        {...otherProps}
      />
    </View>
    </>
  );
}

export default TextArea;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  TextInput: {
    minHeight: 120,
    paddingTop: 10,
    paddingStart: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.inputRadius,
    borderColor: '#dce0e3',
    marginBottom: 4,
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    elevation: 4,
  },
});
