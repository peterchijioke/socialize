import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Menu, PlusCircle, Search, MessageCircle} from 'lucide-react-native';

const TopBar = () => {
  return (
    <View style={styles.topBar}>
      <View style={styles.logoMenu}>
        <Menu color="#000" />
        <Text style={styles.logo}>Socialize</Text>
      </View>
      <View style={styles.topIcons}>
        <PlusCircle size={22} color="#000" style={styles.icon} />
        <Search size={22} color="#000" style={styles.icon} />
        <MessageCircle color="#000" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  logoMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logo: {
    fontSize: 24,
    color: '#1877F2',
    fontWeight: 'bold',
  },
  topIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
});

export default TopBar;
