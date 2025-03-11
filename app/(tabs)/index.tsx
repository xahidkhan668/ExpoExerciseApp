import { View, Text, Image, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import ExerciseCarousel from '../../components/ExerciseCarousel';
import React from 'react';
import ExerciseDetailCard from '@/components/ExerciseDetailCard';
import EditActionBar from '@/components/EditActionBar';

// Your workout data
const workoutData = {
  workout_name: "Full Body 1",
  exercises: [
    {
      name: "Squat",
      gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif",
      equipment: "barbell"
    },
    {
      name: "Inclined Bench Press",
      gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif",
      equipment: "barbell"
    },
    {
      name: "Pull Ups",
      gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif",
      equipment: "bodyweight"
    },
    {
      name: "Shoulder Press",
      gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif",
      equipment: "dumbbell"
    },
    {
      name: "Curl Biceps",
      gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.gif",
      equipment: "cable"
    },
    {
      name: "Extension Triceps",
      gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.gif",
      equipment: "cable"
    }
  ]
};

export default function HomeScreen() {
  const { index } = useLocalSearchParams();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const exercise = workoutData.exercises[currentIndex];
  const [isMainGifLoading, setIsMainGifLoading] = React.useState(true);
  const [hasMainGifError, setHasMainGifError] = React.useState(false);

  const handleExercisePress = (newIndex: number) => setCurrentIndex(newIndex);

  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Exercise not found</Text>
      </SafeAreaView>
    );
  }

  const handleLongPress = () => {
    setIsEditMode(true);
  };

  const handleDiscard = () => {
    setIsEditMode(false);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header with back button */}
      <View className="flex-row items-center p-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <FontAwesome name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-semibold ml-4">{workoutData.workout_name}</Text>
      </View>

      {/* Exercise Carousel */}
      <ExerciseCarousel
        exercises={workoutData.exercises}
        currentIndex={currentIndex}
        isEditMode={isEditMode}
        onExercisePress={handleExercisePress}
        onExerciseLongPress={handleLongPress}
      />

      {/* Exercise Title and Replace Button */}
      <View className="px-4">
      <ExerciseDetailCard
        name={exercise.name}
        gifUrl={exercise.gif_asset_url}
        equipment={exercise.equipment}
        onReplacePress={() => {/* Handle replace */}}
        onInstructionsPress={() => {/* Handle instructions */}}
        onWarmUpPress={() => {/* Handle warm up */}}
        onFAQPress={() => {/* Handle FAQ */}}
      />
      </View>

      {isEditMode && (
        <EditActionBar
          onDiscard={handleDiscard}
          onSave={handleSave}
        />
      )}
    </SafeAreaView>
  );
} 