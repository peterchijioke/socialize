import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
  Forward,
  MessageCircleMore,
} from 'lucide-react-native';

interface FeedPostProps {
  username: string;
  postTime: string;
  postText: string;
  imageUrl: string;
  likes?: number;
  comments?: number;
}

const FeedPost = ({
  username,
  postTime,
  postText,
  imageUrl,
  likes = 0,
  comments = 0,
}: FeedPostProps) => {
  return (
    <View style={styles.feedPost}>
      <View style={styles.postHeader}>
        <Image source={{uri: imageUrl}} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.postTime}>{postTime}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{postText}</Text>
      <Image source={{uri: imageUrl}} style={styles.postImage} />

      <View style={styles.interactionBar}>
        <View style={styles.interactionStats}>
          <ThumbsUp size={16} color="#1877F2" />
          <Text style={styles.interactionText}>{likes}</Text>
        </View>
        <View style={styles.interactionStats}>
          <Text style={styles.interactionText}>{comments} comments</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <ThumbsUp size={24} color="#65676B" />
          <Text style={styles.actionButtonText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={24} color="#65676B" />
          <Text style={styles.actionButtonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircleMore size={24} color="#65676B" />
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Forward size={24} color="#65676B" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedPost: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postText: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EB',
  },
  interactionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 5,
    color: '#65676B',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  actionButtonText: {
    marginLeft: 5,
    color: '#65676B',
    fontSize: 14,
  },
});

export default FeedPost;
