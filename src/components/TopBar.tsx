import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {
  Menu,
  PlusCircle,
  Search,
  MessageCircle,
  FileText,
  BookOpen,
  Video,
  Radio,
  StickyNote,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const TopBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [showDropdown, setShowDropdown] = useState(false);

  const menuItems = [
    {id: 1, label: 'Post', icon: FileText},
    {id: 2, label: 'Story', icon: BookOpen},
    {id: 3, label: 'Reel', icon: Video},
    {id: 4, label: 'Live', icon: Radio},
    {id: 5, label: 'Note', icon: StickyNote},
  ];

  const handleMenuItemPress = (item: string) => {
    setShowDropdown(false);
    console.log(`Selected: ${item}`);
  };

  return (
    <View style={styles.topBar}>
      <View style={styles.logoMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Menu color="#000" />
        </TouchableOpacity>
        <Text style={styles.logo}>Socialize</Text>
      </View>
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => setShowDropdown(true)}>
          <PlusCircle size={22} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <Search size={22} color="#000" style={styles.icon} />
        <MessageCircle color="#000" style={styles.icon} />
      </View>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}>
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              {menuItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item.label)}>
                    <View style={styles.menuItemContent}>
                      <item.icon
                        size={20}
                        color="#000"
                        style={styles.menuItemIcon}
                      />
                      <Text style={styles.menuItemText}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                  {index < menuItems.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 15,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    minWidth: 150,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
});

export default TopBar;
