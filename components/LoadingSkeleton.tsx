import {useEffect} from 'react';
import { View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence,
  withTiming,
  useSharedValue,  
} from 'react-native-reanimated';

interface LoadingSkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
}

export default function LoadingSkeleton({ 
  width, 
  height, 
  borderRadius = 8 
}: LoadingSkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius },
        animatedStyle
      ]}
      className="bg-gray-300"
    />
  );
} 