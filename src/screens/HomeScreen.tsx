import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Stories from '../components/Stories';
import Feed from '../components/Feed';
import TopBar from '../components/TopBar';
import NavigationBar from '../components/NavigationBar';
import StatusInput from '../components/StatusInput';

const HomeScreen = () => {
  const image_url = 'https://github.com/shadcn.png';
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        nestedScrollEnabled
        style={styles.container}>
        <TopBar />
        <NavigationBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          imageUrl={image_url}
        />
        <StatusInput imageUrl={image_url} />
        <Stories />
        <Feed />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 55,
  },
});

export default HomeScreen;
