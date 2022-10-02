import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  isSidebarOpened: boolean;
  openSubmenus: string[];
}

const initialState: LayoutState = {
  isSidebarOpened: true,
  openSubmenus: [],
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    changeSubmenus: (state, { payload: { keys } }) => {
      state.openSubmenus = keys;
    },
    openSidebar: (state) => ({ ...state, isSidebarOpened: true }),
    closeSidebar: (state) => ({ ...state, isSidebarOpened: false }),
    toggleSidebar: ({ isSidebarOpened, ...state }) => ({
      ...state,
      isSidebarOpened: !isSidebarOpened,
    }),
  },
});

// Action creators  generated for each case reducer function
export const { changeSubmenus, openSidebar, closeSidebar, toggleSidebar } = layoutSlice.actions;

export const selectSidebarIsOpen = (state) => state.layout.isSidebarOpened;
export const selectSidebarSubmenus = (state) => state.layout.openSubmenus;

export default layoutSlice.reducer;
