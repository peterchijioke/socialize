import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, ViewToken} from 'react-native';
import FeedPost from './FeedPost';
import Reels from './Reels';

interface Post {
  id: number;
  username: string;
  postTime: string;
  postText: string;
  imageUrl: string;
  videoUrl?: string;
  likes?: number;
  comments?: number;
  type: 'image' | 'video';
}

const Feed = () => {
  const image_url = 'https://github.com/shadcn.png';
  const video_url =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const initialPosts: Post[] = [
    {
      id: 1,
      username: 'Jennifer John',
      postTime: '8h • 🌍',
      postText:
        '50k each to 3 Financial Women coming on this money journey with me 🎉🎉',
      imageUrl: image_url,
      likes: 245,
      comments: 32,
      type: 'image',
    },
    {
      id: 2,
      username: 'Tech Enthusiast',
      postTime: '5h • 🌐',
      postText:
        'Just finished building my first React Native app! The journey has been amazing. #coding #reactnative',
      imageUrl: image_url,
      likes: 189,
      comments: 24,
      type: 'image',
    },
    {
      id: 3,
      username: 'Travel Explorer',
      postTime: '2h • 🌎',
      postText:
        'Beautiful sunset at the beach today! Nature never fails to amaze me. 🌅',
      imageUrl: image_url,
      videoUrl: video_url,
      likes: 432,
      comments: 56,
      type: 'video',
    },
    {
      id: 4,
      username: 'Food Lover',
      postTime: '1h • 🍽️',
      postText:
        'Made this delicious pasta from scratch today! Recipe in comments 👇',
      imageUrl: image_url,
      likes: 156,
      comments: 18,
      type: 'image',
    },
    {
      id: 5,
      username: 'Nature Lover',
      postTime: '30m • 🌿',
      postText: 'Amazing wildlife documentary I filmed today!',
      imageUrl: image_url,
      videoUrl: video_url,
      likes: 289,
      comments: 42,
      type: 'video',
    },
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [visibleVideoId, setVisibleVideoId] = useState<number | null>(null);

  const handleRemovePost = (postId: number) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const visibleVideo = viewableItems.find(
        item => item.item.type === 'video' && item.isViewable,
      );
      setVisibleVideoId(visibleVideo ? visibleVideo.item.id : null);
    },
    [],
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderPost = ({item, index}: {item: Post; index: number}) => (
    <FeedPost
      isLast={index === posts.length - 1}
      username={item.username}
      postTime={item.postTime}
      postText={item.postText}
      imageUrl={item.imageUrl}
      videoUrl={item.videoUrl}
      likes={item.likes}
      comments={item.comments}
      type={item.type}
      onRemove={() => handleRemovePost(item.id)}
      isVideoPlaying={visibleVideoId === item.id}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Reels />
      <FlatList
        nestedScrollEnabled
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
});

export default Feed;
