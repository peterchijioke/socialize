import React, {useRef} from 'react';
import {Animated, TouchableOpacity, TouchableOpacityProps} from 'react-native';

const BouncyTouchable: React.FC<TouchableOpacityProps> = ({
  children,
  onPress,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BouncyTouchable;
