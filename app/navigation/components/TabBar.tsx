/* eslint-disable indent */
import { TouchableOpacity, View, StyleSheet, Text, Platform } from 'react-native';
import { COLORS, SIZES } from '../../theme';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons'
import { useContext } from 'react';
import { i18nContext } from '../../context/i18nContext';

const IOS = Platform.OS ===  'ios';

function TabBar({ state, descriptors, navigation }: any) {
  const {i18n} = useContext(i18nContext);
  return (
    <View style={{...styles.container, borderTopWidth: 0.19999, borderTopColor: COLORS.gray}}>
      <View style={styles.tab}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : i18n.t(route.name.toString().toLowerCase());

          const isFocused = state.index === index;

          const color = isFocused ? COLORS.primary : COLORS.gray;

          const icon =
            route.name === 'Home'
              ? 'home-outline'
              : route.name === 'News'
              ? 'newspaper-variant-multiple-outline'
              : route.name === 'Consultations'
              ? 'account-details-outline'
              : route.name === 'Jobs'
              ? 'briefcase-search-outline'
              : 'gavel';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
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
            <View key={route.key} style={styles.menuTab}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.menuButton}
              >
                <View style={{ opacity: isFocused ? 1 : 0.3 }}>
                  <Icon name={icon} size={!IOS ? 48: 32} color={color} />
                </View>
                <Text style={{ ...styles.label, color }}>{label}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.m,
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.black
  },
  tab: {
    height: 85,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
});
