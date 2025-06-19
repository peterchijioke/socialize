import {VideoIcon} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

interface StoryItem {
  id: number;
  label: string;
}

const Reels = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stories: StoryItem[] = Array.from({length: 20}, (_, i) => ({
    id: i,
    label: `Story ${i + 1}`,
  }));

  const renderStory = ({item}: {item: StoryItem}) => (
    <TouchableOpacity style={styles.storyImage}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#2d2d8c" />
        </View>
      )}
      <Video
        source={{
          uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        }}
        style={styles.video}
        resizeMode="cover"
        repeat
        onLoad={() => setIsLoading(false)}
        onError={error => {
          setError(error.error.errorString || 'Unknown error');
          setIsLoading(false);
        }}
      />
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <VideoIcon />
        <Text style={styles.headerText}>Reels</Text>
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
  container: {
    width: '100%',
    paddingVertical: 5,
    gap: 8,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  storiesContainer: {
    paddingLeft: 10,
    marginBottom: 10,
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 3,
    // paddingBottom: 15,
  },
  storyImage: {
    width: 230,
    height: 350,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
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
