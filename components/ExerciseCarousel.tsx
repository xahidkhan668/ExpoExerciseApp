import React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Exercise } from '../types/workout';
import LoadingSkeleton from './LoadingSkeleton';
import GifImage from './GifImage';

interface ExerciseCarouselProps {
  exercises: Exercise[];
  currentIndex: number;
  isEditMode: boolean;
  onExercisePress: (index: number) => void;
  onExerciseLongPress: (index: number) => void;
}

export default function ExerciseCarousel({
  exercises,
  currentIndex,
  isEditMode,
  onExercisePress,
  onExerciseLongPress,
}: ExerciseCarouselProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: currentIndex * 80,
      animated: true
    });
  }, [currentIndex]);

  return (
    <View className="py-4 px-4">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 py-4"
        className="space-x-6">
        {exercises.map((exercise, index) => (
          <View key={index} className="last:mr-0">
            <ExerciseThumb
              exercise={exercise}
              onLongPress={() => onExerciseLongPress(index)}
              isActive={index === currentIndex}
              isCompleted={index < currentIndex}
              onPress={() => onExercisePress(index)}
              isEditMode={isEditMode}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function ExerciseThumb({ 
  exercise, 
  isActive, 
  isCompleted, 
  onLongPress,
  isEditMode,
  onPress 
}: { 
  exercise: Exercise;
  isActive: boolean;
  isCompleted: boolean;
  onPress: () => void;
  isEditMode: boolean;
  onLongPress: () => void;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      className={`w-17 h-17 rounded-full relative justify-center items-center
        ${isActive ? 'border-2 border-yellow-400' : 'border-2 border-white'} `}
    >
      <View className={`w-14 h-14 rounded-full relative justify-center items-center border-gray-200 border-2
        bg-white`}>
      {isLoading && (
        <View className="absolute inset-0">
          <LoadingSkeleton 
            width="100%" 
            height="100%" 
            borderRadius={32}
          />
        </View>
      )}
      
      {/* Exercise GIF */}
      <View className={`w-full h-full rounded-full overflow-hidden
        ${isActive ? 'scale-95' : 'scale-100'}`}>
        <GifImage
          source={{ uri: exercise.gif_asset_url }}
          style={{
            width: '100%',
            height: '100%',
          }}
          paused={!isActive}
          resizeMode="cover"
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </View>
      
      {hasError && (
        <View className="absolute inset-0 bg-gray-200 items-center justify-center">
          <FontAwesome name="image" size={20} color="#9CA3AF" />
        </View>
      )}
      
      {/* Status Indicators */}
      {!isLoading && !hasError && (
        <>
          {(!isEditMode && isCompleted) && (
            <View className="border-2 border-white absolute bottom-0 right-0 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
              <FontAwesome name="check" size={12} color="black" />
            </View>
          )}
          
          {(!isEditMode && isActive) && (
            <View className="border-2 border-white absolute bottom-0 right-0 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
              <FontAwesome name="play" size={12} color="black" />
            </View>
          )}
          
          {isEditMode && (
            <View className=" absolute top-[-3px] right-[-3px] w-5 h-5 bg-red-800 rounded-full items-center justify-center">
              <FontAwesome name="minus" size={12} color="white" />
            </View>
          )}
        </>
      )}
      </View>
    </Pressable>
  );

} 