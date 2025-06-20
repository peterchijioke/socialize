import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';

interface StoryItem {
  id: number;
  label: string;
}

const image_url = 'https://github.com/shadcn.png';

const videoUrls = [
  'https://cdn.jsdelivr.net/gh/peterchijioke/socialize/mov_bbb%20(1).mp4',
  'https://cdn.jsdelivr.net/gh/peterchijioke/socialize/mov_bbb%20(1).mp4',
  'https://cdn.jsdelivr.net/gh/peterchijioke/socialize/mov_bbb%20(1).mp4',
  'https://cdn.jsdelivr.net/gh/peterchijioke/socialize/mov_bbb%20(1).mp4',
  'https://cdn.jsdelivr.net/gh/peterchijioke/socialize/mov_bbb%20(1).mp4',
  'https://cdn.jsdelivr.net/gh/peterchijioke/socialize/mov_bbb%20(1).mp4',
];

const StoryItemComponent = ({
  item,
  videoUrl,
}: {
  item: StoryItem;
  videoUrl: string | any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('Timeout: Forcing spinner to hide after 5s');
        setError('Loading timed out');
        setIsLoading(false);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <View style={styles.storyImage}>
      <Video
        source={{uri: videoUrl}}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
        onLoad={() => setIsLoading(false)}
        onError={err => {
          console.log('Video Error:', err);
          setError(err?.error?.errorString || 'Unknown error');
          setIsLoading(false);
        }}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        maxBitRate={1000000}
      />

      {isLoading && (
        <View style={styles.loadingContainer} pointerEvents="none">
          <ActivityIndicator size="small" color="#2d2d8c" />
        </View>
      )}
      {error && !isLoading && (
        <Text style={styles.errorText}>Error: {error}</Text>
      )}
      <Image source={{uri: image_url}} style={styles.reelImage} />
      <View style={styles.storyLabelContainer}>
        <Text style={styles.storyLabel}>{item.label}</Text>
      </View>
    </View>
  );
};

const Stories = () => {
  const stories: StoryItem[] = Array.from({length: 20}, (_, i) => ({
    id: i,
    label: `Story ${i + 1}`,
  }));

  return (
    <FlatList
      nestedScrollEnabled
      initialNumToRender={3}
      windowSize={5}
      data={stories}
      renderItem={({item, index}) => (
        <StoryItemComponent
          item={item}
          videoUrl={videoUrls[index % videoUrls.length]}
        />
      )}
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
    zIndex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240,240,240,0.7)',
    zIndex: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    padding: 2,
    zIndex: 3,
  },
  storyLabel: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  storyLabelContainer: {
    marginTop: 'auto',
    zIndex: 4,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  reelImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderColor: '#1877F2',
    borderWidth: 2,

    marginTop: 5,
    marginLeft: 5,
    zIndex: 4,
  },
});

export default Stories;
