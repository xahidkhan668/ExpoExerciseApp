export interface Exercise {
  name: string;
  gif_asset_url: string;
  equipment: 'barbell' | 'dumbbell' | 'cable' | 'bodyweight';
  isCompleted?: boolean;
  isActive?: boolean;
}

export interface Workout {
  workout_name: string;
  exercises: Exercise[];
} 