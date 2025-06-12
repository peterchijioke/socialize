import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FeedPost from './FeedPost';

interface Post {
  id: number;
  username: string;
  postTime: string;
  postText: string;
  imageUrl: string;
}

const Feed = () => {
  const image_url = 'https://github.com/shadcn.png';

  const posts: Post[] = Array.from({length: 2}, (_, i) => ({
    id: i,
    username: 'Jennifer John',
    postTime: '8h • 🌍',
    postText:
      '50k each to 3 Financial Women coming on this money journey with me 🎉🎉',
    imageUrl: image_url,
  }));

  const renderPost = ({item}: {item: Post}) => (
    <FeedPost
      username={item.username}
      postTime={item.postTime}
      postText={item.postText}
      imageUrl={item.imageUrl}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
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
