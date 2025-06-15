import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {FlashList} from '@shopify/flash-list';
import {
  Camera,
  Heart,
  ImageIcon,
  Send,
  ThumbsDown,
  ThumbsUp,
  UserRound,
} from 'lucide-react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import ActionSheet, {
  ScrollView,
  FlatList,
  useScrollHandlers,
} from 'react-native-actions-sheet';

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}

interface CommentInteractionsProps {
  likes: number | string;
}

const CommentInteractions: React.FC<CommentInteractionsProps> = ({likes}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}>
        <Text style={{color: 'black'}}>{likes}</Text>
        <TouchableOpacity>
          <ThumbsUp size={15} color={'blue'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}>
        <TouchableOpacity>
          <Heart size={15} color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

type FlashListProps = {
  data: Comment[];
  renderItem: ({item}: {item: Comment}) => React.ReactElement;
  keyExtractor: (item: Comment) => string;
  showsVerticalScrollIndicator?: boolean;
};

export default function CommentActionSheet() {
  const [commentText, setCommentText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const image_url = 'https://github.com/shadcn.png';
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: 'John Doe',
      avatar: image_url,
      text: 'This is amazing! Love the content!',
      likes: 12,
      time: '2h',
    },
    {
      id: 2,
      username: 'Jane Smith',
      avatar: image_url,
      text: 'Great post! Thanks for sharing.',
      likes: 8,
      time: '1h',
    },
    {
      id: 3,
      username: 'Mike Johnson',
      avatar: image_url,
      text: 'I totally agree with this!',
      likes: 5,
      time: '30m',
    },
  ]);
  const handlers = useScrollHandlers();

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      username: 'You', // This should be replaced with actual user data
      avatar: image_url,
      text: commentText.trim(),
      likes: 0,
      time: 'Just now',
    };

    setComments(prevComments => [newComment, ...prevComments]);
    setCommentText('');
  };

  const renderComment = ({item}: {item: Comment}) => (
    <View style={styles.commentItem}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.commentActions}>
            <TouchableOpacity>
              <Text style={styles.actionText}>1d</Text>
            </TouchableOpacity>
            <Text style={styles.likesCount}>{item.likes} likes</Text>
            <TouchableOpacity>
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>
          </View>
          <CommentInteractions likes={item.likes} />
        </View>
      </View>
    </View>
  );

  return (
    <ActionSheet
      springOffset={1}
      gestureEnabled={true}
      containerStyle={{
        height: '98%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 5,
        }}>
        <CommentInteractions likes={'20k'} />
        <Text
          style={{
            color: 'black',
          }}>
          500 Shares
        </Text>
      </View>
      <FlatList<Comment>
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item: Comment) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{
          height: '100%',
        }}
        contentContainerStyle={{padding: 16}}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor="#65676B"
          value={commentText}
          onChangeText={setCommentText}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {isInputFocused && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <>
                  <Camera size={20} />
                  <ImageIcon size={20} />
                  <UserRound size={20} />
                </>
              </View>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !commentText.trim() && styles.sendButtonDisabled,
                ]}
                disabled={!commentText.trim()}
                onPress={handleAddComment}>
                <Send
                  size={20}
                  color={commentText.trim() ? '#1877F2' : '#65676B'}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#050505',
  },
  closeButton: {
    fontSize: 20,
    color: '#65676B',
  },
  commentsContainer: {
    padding: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontWeight: '600',
    color: '#050505',
    marginRight: 8,
  },
  time: {
    color: '#65676B',
    fontSize: 12,
  },
  commentText: {
    color: '#050505',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  actionText: {
    color: '#65676B',
    fontSize: 13,
    fontWeight: '500',
  },
  likesCount: {
    color: '#65676B',
    fontSize: 13,
  },
  inputContainer: {
    marginTop: 'auto',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
    backgroundColor: '#fff',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 40,
    maxHeight: 120,
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
