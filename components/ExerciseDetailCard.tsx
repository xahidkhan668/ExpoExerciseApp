import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GifImage from './GifImage';

interface ExerciseDetailCardProps {
  name: string;
  gifUrl: string;
  equipment: string;
  onReplacePress?: () => void;
  onInstructionsPress?: () => void;
  onWarmUpPress?: () => void;
  onFAQPress?: () => void;
}

export default function ExerciseDetailCard({
  name,
  gifUrl,
  equipment,
  onReplacePress,
  onInstructionsPress,
  onWarmUpPress,
  onFAQPress,
}: ExerciseDetailCardProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  return (
    <View className="bg-white rounded-2xl p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">{name}</Text>
        <Pressable 
          onPress={onReplacePress}
          className="bg-yellow-400 flex-row items-center px-4 py-2 rounded-full"
        >
          <FontAwesome name="exchange" size={16} color="black" />
          <Text className="ml-2 font-medium">Replace</Text>
        </Pressable>
      </View>

      {/* Main Content */}
      <View className="bg-gray-100 rounded-2xl p-1">
        {/* Exercise Illustration */}
        <View className="bg-white rounded-xl overflow-hidden">
          

          {/* Equipment Badge */}
        <View className="m-2">
        <GifImage
            source={{ uri: gifUrl }}
            style={{
              width: '100%',
              height: 280,
            }}
            resizeMode="contain"
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
          <View className="absolute bottom-[10px] left-[10px] shadow-lg shadow-black/50 bg-white self-start rounded-full px-4 py-2 flex-row items-center">
            <FontAwesome 
              name={'gear'} 
              size={16} 
              color="black" 
            />
            <Text className="ml-2 capitalize">{equipment}</Text>
          </View>
        </View>

          {isLoading && (
            <View className="absolute inset-0 bg-gray-100 items-center justify-center">
              <FontAwesome name="spinner" size={24} color="#9CA3AF" />
            </View>
          )}

          {hasError && (
            <View className="absolute inset-0 bg-gray-100 items-center justify-center">
              <FontAwesome name="image" size={24} color="#9CA3AF" />
              <Text className="mt-2 text-gray-500">Failed to load exercise</Text>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-around mt-4">
        <ActionButton
          icon="file-text-o"
          label="Instructions"
          onPress={onInstructionsPress}
        />
        <ActionButton
          icon="fire"
          label="Warm Up"
          onPress={onWarmUpPress}
        />
        <ActionButton
          icon="question-circle-o"
          label="FAQ"
          onPress={onFAQPress}
        />
      </View>
    </View>
  );
}

function ActionButton({ 
  icon, 
  label, 
  onPress 
}: { 
  icon: string; 
  label: string; 
  onPress?: () => void;
}) {
  return (
    <Pressable 
      onPress={onPress}
      className="flex-row items-center px-3 py-2 border border-gray-300 rounded-full"
    >
      <FontAwesome name={'gear'}  size={20} color="black" />
      <Text className="ml-2 font-medium">{label}</Text>
    </Pressable>
  );
}
