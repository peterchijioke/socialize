import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ActionSheet, {useScrollHandlers} from 'react-native-actions-sheet';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

export default function CardActionSheet() {
  const handlers = useScrollHandlers();
  return (
    <ActionSheet
      springOffset={1}
      gestureEnabled={true}
      containerStyle={{
        height: '90%',
      }}
      // headerAlwaysVisible={false}
    >
      <NativeViewGestureHandler
        simultaneousHandlers={handlers.simultaneousHandlers}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 16,
          }}
          style={styles.contentContainer}
          {...handlers}>
          <View>
            <View style={styles.headerSection}>
              <Text style={styles.headerTitle}>Why am I seeing this post?</Text>
              <Text style={styles.headerDescription}>
                This post is suggested based on your activity.
              </Text>
            </View>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>+</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Interested</Text>
                <Text style={styles.itemDescription}>
                  More suggested posts in your feed will be like this.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>−</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Not interested</Text>
                <Text style={styles.itemDescription}>
                  Less suggested posts in your feed will be like this.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🏷️</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Save post</Text>
                <Text style={styles.itemDescription}>
                  Add this to your saved items.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>✕</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Hide post</Text>
                <Text style={styles.itemDescription}>
                  See fewer posts like this.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>⚠️</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Report photo</Text>
                <Text style={styles.itemDescription}>
                  We won't let AngieNation know who reported this.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🔔</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>
                  Turn on notifications for this post
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📄</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Copy link</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.spacer} />

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>⏰</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>
                  Snooze AngieNation for 30 days
                </Text>
                <Text style={styles.itemDescription}>
                  Temporarily stop seeing posts.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>✕</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Hide all from AngieNation</Text>
                <Text style={styles.itemDescription}>
                  Stop seeing posts from this Page.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>👤</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>
                  Block AngieNation's profile
                </Text>
                <Text style={styles.itemDescription}>
                  You won't be able to see or contact each other.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>⚙️</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Manage your Feed</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </NativeViewGestureHandler>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    color: '#1877f2',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  headerDescription: {
    color: '#050505',
    fontSize: 15,
    lineHeight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    minHeight: 48,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  icon: {
    color: '#050505',
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    flex: 1,
    paddingTop: 2,
  },
  itemTitle: {
    color: '#050505',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 2,
  },
  itemDescription: {
    color: '#65676b',
    fontSize: 13,
    lineHeight: 16,
  },
  spacer: {
    height: 16,
  },
});
