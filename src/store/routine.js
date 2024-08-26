import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

const useRoutineStore = create(
  devtools(
    (set) => ({
      routines: [],
      addRoutine: (routine) =>
        set(
          produce((state) => {
            state.routines.push(routine);
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
          })
        ),
    }),
    { name: 'routine-store' }
  )
);

export default useRoutineStore;
