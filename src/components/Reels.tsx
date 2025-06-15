import {VideoIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Video from 'react-native-video';

interface StoryItem {
  id: number;
  label: string;
}

const Reels = () => {
  const stories: StoryItem[] = Array.from({length: 20}, (_, i) => ({
    id: i,
    label: `Story ${i + 1}`,
  }));

  const renderStory = ({item}: {item: StoryItem}) => (
    <View style={styles.storyImage}>
      <Video
        source={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
      />
    </View>
  );

  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 5,
      }}>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
        <VideoIcon />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'black',
          }}>
          Reels
        </Text>
      </View>

      <FlatList
        nestedScrollEnabled
        data={stories}
        renderItem={renderStory}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
      />
    </View>
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
    width: 100,
    height: 200,
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

export default Reels;
