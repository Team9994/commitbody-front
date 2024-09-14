import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce, enableMapSet } from 'immer';
enableMapSet();

const useRoutineStore = create(
  devtools(
    (set, get) => ({
      routines: [],
      selectedExerciseIds: new Set(),
      addRoutine: ({ id, name }) =>
        set(
          produce((state) => {
            if (!state.routines.some((r) => r.id === id)) {
              state.routines.push({ id, name });
              state.selectedExerciseIds.add(id);
            }
          })
        ),
      updateRoutine: (id, { name }) =>
        set(
          produce((state) => {
            const routine = state.routines.find((r) => r.id === id);
            if (routine) {
              routine.name = name;
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
