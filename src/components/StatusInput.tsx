import {View, StyleSheet, TextInput, Image} from 'react-native';
import React from 'react';
import {ImageIcon} from 'lucide-react-native';

interface StatusInputProps {
  imageUrl: string;
}

const StatusInput = ({imageUrl}: StatusInputProps) => {
  return (
    <View style={styles.searchPane}>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
        source={{uri: imageUrl}}
      />
      <TextInput
        style={styles.statusInput}
        placeholder="What's on your mind?"
        placeholderTextColor="#666"
      />
      <ImageIcon color={'green'} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchPane: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  statusInput: {
    margin: 15,
    padding: 12,
    height: 35,
    borderColor: '#f0f2f5',
    borderWidth: 1,
    borderRadius: 25,
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default StatusInput;
