import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce, enableMapSet } from 'immer';
enableMapSet();

const useRoutineStore = create(
  devtools(
    (set, get) => ({
      routines: [],
      selectedExerciseIds: new Set(),
      addRoutine: (routine) =>
        set(
          produce((state) => {
            const existingRoutine = state.routines.find((r) => r.id === routine.id);
            if (!existingRoutine) {
              // 기존 ID가 없는 경우에만 새 루틴 추가
              state.routines.push(routine);
              // 여기에서 selectedExerciseIds set에 추가
              state.selectedExerciseIds.add(routine.id);
            }
          })
        ),
      updateRoutine: (id, updatedRoutine) =>
        set(
          produce((state) => {
            const index = state.routines.findIndex((r) => r.id === id);
            if (index !== -1) {
              state.routines[index] = { ...state.routines[index], ...updatedRoutine };
            }
          })
        ),
      deleteRoutine: (id) =>
        set(
          produce((state) => {
            state.routines = state.routines.filter((r) => r.id !== id);
            state.selectedExerciseIds.delete(id);
          })
        ),
      getRoutineCount: () => get().routines.length,
    }),
    { name: 'routine-store' }
  )
);

export default useRoutineStore;
