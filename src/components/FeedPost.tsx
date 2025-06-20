import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Linking,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
  Forward,
  MessageCircleMore,
  X,
  MoreVertical,
  MoreHorizontal,
  Play,
  Pause,
  Mic,
  MicOff,
} from 'lucide-react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Video from 'react-native-video';

interface FeedPostProps {
  username: string;
  postTime: string;
  postText: string;
  imageUrl: string;
  videoUrl?: string;
  likes?: number;
  comments?: number;
  isLast?: boolean;
  type: 'image' | 'video';
  onRemove?: () => void;
  isVideoPlaying: boolean;
}

const FeedPost = ({
  username,
  postTime,
  postText,
  imageUrl,
  videoUrl,
  likes = 0,
  comments = 0,
  isLast = false,
  type,
  onRemove,
  isVideoPlaying,
}: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const hideControlsTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const videoLoadTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Animation values
  const headerAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const mediaAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;

  // Icon rotation animation
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animation for each section
    Animated.stagger(100, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(mediaAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(barAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(buttonsAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();

    // Icon rotation animation
    Animated.timing(iconRotateAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [headerAnim, textAnim, mediaAnim, barAnim, buttonsAnim, iconRotateAnim]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleVideoPress = () => {
    setIsPaused(!isPaused);
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const resetHideControlsTimeout = () => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (!isPaused) {
        setShowControls(false);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      if (videoLoadTimeout.current) {
        clearTimeout(videoLoadTimeout.current);
      }
    };
  }, []);

  // Debug video URL
  useEffect(() => {
    if (type === 'video' && videoUrl) {
      console.log('FeedPost: Video URL received:', videoUrl);
    }
  }, [type, videoUrl]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${username}'s post: ${postText}`,
        url: imageUrl,
      });
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleWhatsAppShare = async () => {
    try {
      const message = `${username}'s post: ${postText}`;
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        const storeUrl = Platform.select({
          ios: 'https://apps.apple.com/app/whatsapp-messenger/id310633997',
          android: 'market://details?id=com.whatsapp',
        });
        if (storeUrl) {
          await Linking.openURL(storeUrl);
        }
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
    }
  };

  const handleMicToggle = () => setIsMuted(m => !m);

  return (
    <View style={[styles.feedPost, isLast && styles.lastFeedPost]}>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          opacity: headerAnim,
          transform: [
            {
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}>
        <View style={styles.postHeader}>
          <Image source={{uri: imageUrl}} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.postTime}>{postTime}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <TouchableOpacity
            onPress={() => {
              SheetManager.show('card-sheet');
            }}>
            <MoreHorizontal size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemove}>
            <X size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          paddingHorizontal: 15,
          width: '100%',
          opacity: textAnim,
          transform: [
            {
              translateY: textAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}>
        <Animated.Text
          style={[
            styles.postText,
            {
              opacity: textAnim,
              transform: [
                {
                  translateY: textAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}>
          {postText}
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: mediaAnim,
          transform: [
            {
              translateY: mediaAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}>
        {type === 'video' && videoUrl ? (
          <TouchableOpacity
            style={styles.videoContainer}
            onPress={handleVideoPress}
            activeOpacity={1}>
            <Video
              source={
                videoUrl ? {uri: videoUrl} : require('../assets/mov_bbb.mp4')
              }
              style={styles.video}
              resizeMode="cover"
              paused={isPaused || !isVideoPlaying}
              repeat={true}
              muted={isMuted}
              bufferConfig={{
                minBufferMs: 15000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              progressUpdateInterval={1000}
              onLoadStart={() => {
                console.log('Video load started for URL:', videoUrl);
                setIsVideoLoading(true);
                setVideoError(false);
                // Set a timeout for video loading (30 seconds)
                if (videoLoadTimeout.current) {
                  clearTimeout(videoLoadTimeout.current);
                }
                videoLoadTimeout.current = setTimeout(() => {
                  if (isVideoLoading) {
                    setVideoError(true);
                    setIsVideoLoading(false);
                    console.warn('Video loading timeout for URL:', videoUrl);
                  }
                }, 30000);
              }}
              onLoad={() => {
                console.log('Video loaded successfully for URL:', videoUrl);
                setIsVideoLoading(false);
                if (videoLoadTimeout.current) {
                  clearTimeout(videoLoadTimeout.current);
                }
              }}
              onError={e => {
                console.error('Video error for URL:', videoUrl, e.error);
                setVideoError(true);
                setIsVideoLoading(false);
                if (videoLoadTimeout.current) {
                  clearTimeout(videoLoadTimeout.current);
                }
              }}
            />
            {isVideoLoading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading video...</Text>
              </View>
            )}
            {videoError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load video</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    setVideoError(false);
                    setIsVideoLoading(true);
                    // Force re-render of video component
                  }}>
                  <Text style={styles.retryText}>Tap to retry</Text>
                </TouchableOpacity>
              </View>
            )}
            {(showControls || isPaused) && !isVideoLoading && !videoError && (
              <>
                <View style={styles.playButton}>
                  {isPaused ? (
                    <Play size={40} color="#fff" />
                  ) : (
                    <Pause size={40} color="#fff" />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.micButton}
                  onPress={handleMicToggle}
                  activeOpacity={0.7}>
                  {isMuted ? (
                    <MicOff size={28} color="#fff" />
                  ) : (
                    <Mic size={28} color="#fff" />
                  )}
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <Animated.Image
            source={{uri: imageUrl}}
            style={[
              styles.postImage,
              {
                opacity: mediaAnim,
                transform: [
                  {
                    translateY: mediaAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
      </Animated.View>

      <Animated.View
        style={{
          ...styles.interactionBar,
          opacity: barAnim,
          transform: [
            {
              translateY: barAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}>
        <View style={styles.interactionStats}>
          <ThumbsUp size={16} color="#1877F2" />
          <Text style={styles.interactionText}>{likeCount}</Text>
        </View>
        <View style={styles.interactionStats}>
          <Text style={styles.interactionText}>{comments} comments</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.actionButtons,
          opacity: buttonsAnim,
          transform: [
            {
              translateY: buttonsAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: iconRotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <ThumbsUp size={24} color={isLiked ? '#1877F2' : '#65676B'} />
          </Animated.View>
          <Text style={[styles.actionButtonText, isLiked && styles.likedText]}>
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            SheetManager.show('comment-sheet');
          }}
          style={styles.actionButton}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: iconRotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <MessageCircle size={24} color="#65676B" />
          </Animated.View>
          <Text style={styles.actionButtonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleWhatsAppShare}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: iconRotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <MessageCircleMore size={24} color="#65676B" />
          </Animated.View>
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: iconRotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <Forward size={24} color="#65676B" />
          </Animated.View>
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedPost: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  lastFeedPost: {
    borderBottomWidth: 0,
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
    height: 250,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -20}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 40,
    padding: 10,
  },
  interactionBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
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
    paddingHorizontal: 15,
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
  likedText: {
    color: '#1877F2',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  retryButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#1877F2',
    borderRadius: 5,
    alignSelf: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  micButton: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
});

export default FeedPost;
