import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  Home,
  UsersRound,
  TvMinimalPlay,
  Store,
  BellIcon,
} from 'lucide-react-native';

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  imageUrl: string;
}

const NavigationBar = ({
  activeTab,
  setActiveTab,
  imageUrl,
}: NavigationBarProps) => {
  const renderNavIcon = (icon: React.ReactNode, tabName: string) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tabName)}
      style={[
        styles.navIconContainer,
        activeTab === tabName && styles.activeNavIcon,
      ]}>
      {icon}
    </TouchableOpacity>
  );

  return (
    <View style={styles.tool}>
      {renderNavIcon(<Home size={22} color="#000" />, 'home')}
      {renderNavIcon(<UsersRound size={22} color="#000" />, 'users')}
      {renderNavIcon(<TvMinimalPlay size={22} color="#000" />, 'watch')}
      {renderNavIcon(<Store size={22} color="#000" />, 'store')}
      {renderNavIcon(<BellIcon size={22} color="#000" />, 'notifications')}
      <TouchableOpacity
        onPress={() => setActiveTab('profile')}
        style={[
          styles.navIconContainer,
          activeTab === 'profile' && styles.activeNavIcon,
        ]}>
        <Image
          style={{
            width: 22,
            height: 22,
            borderRadius: 12,
          }}
          source={{uri: imageUrl}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tool: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  navIconContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeNavIcon: {
    borderBottomWidth: 2,
    borderBottomColor: '#1877F2',
  },
});

export default NavigationBar;
