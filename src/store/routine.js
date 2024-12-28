import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce, enableMapSet } from 'immer';
enableMapSet();

const useRoutineStore = create(
  devtools(
    (set, get) => ({
      routines: [],
      selectedExerciseIds: new Set(),
      addRoutine: ({ gif, id, name, type }) =>
        set(
          produce((state) => {
            if (!state.routines.some((r) => r.id === id)) {
              state.routines.push({ gif, id, name, type });
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
      clearRoutines: () =>
        set({
          routines: [],
          selectedExerciseIds: new Set(),
        }),
    }),
    { name: 'routine-store' }
  )
);

export const useRoutineInputStore = create((set) => ({
  routineName: '',
  setInput: (value) => set({ routineName: value }),
  onChange: (event) => set({ routineName: event.target.value }),
}));

export default useRoutineStore;
