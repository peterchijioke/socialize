import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Video from 'react-native-video';

interface StoryItem {
  id: number;
  label: string;
}

const Stories = () => {
  const image_url = 'https://github.com/shadcn.png';
  const stories: StoryItem[] = Array.from({length: 20}, (_, i) => ({
    id: i,
    label: `Story ${i + 1}`,
  }));

  const renderStory = ({item}: {item: StoryItem}) => (
    <View style={styles.storyImage}>
      <Video
        source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
      />
      <Image source={{uri: image_url}} style={styles.reelImage} />
      <View style={styles.storyLabelContainer}>
        <Text style={styles.storyLabel}>{item.label}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={stories}
      renderItem={renderStory}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}
    />
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    paddingLeft: 10,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 3,
    paddingBottom: 15,
  },
  storyImage: {
    width: 90,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    padding: 5,
  },
  storyLabel: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'bold',
    color: '#fff',
  },
  storyLabelContainer: {
    marginTop: 'auto',
  },
  reelImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderColor: '#1877F2',
    borderWidth: 2,
    marginTop: 3,
    marginLeft: 3,
  },
});

export default Stories;
