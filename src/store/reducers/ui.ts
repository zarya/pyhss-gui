import {createSlice} from '@reduxjs/toolkit';
import {
  addWindowClass,
  calculateWindowSize,
  removeWindowClass
} from '@app/utils/helpers';
import {
  NAVBAR_DARK_VARIANTS,
  NAVBAR_LIGHT_VARIANTS,
  SIDEBAR_DARK_SKINS,
  SIDEBAR_LIGHT_SKINS
} from '@app/utils/themes';

export interface UiState {
  screenSize: string;
  menuSidebarCollapsed: boolean;
  controlSidebarCollapsed: boolean;
  darkMode: boolean;
  headerBorder: boolean;
  headerFixed: boolean;
  footerFixed: boolean;
  layoutBoxed: boolean;
  layoutFixed: boolean;
  menuItemFlat: boolean;
  menuChildIndent: boolean;
  navbarVariant: string;
  sidebarSkin: string;
}

const initialState: UiState = {
  screenSize: calculateWindowSize(window.innerWidth),
  darkMode: (localStorage.getItem('darkmode')==='yes'?true:false), 
  navbarVariant: 'navbar-light',
  sidebarSkin: (localStorage.getItem('darkmode')==='yes'?'sidebar-dark-olive':'sidebar-light-olive'),
  menuSidebarCollapsed: false,
  controlSidebarCollapsed: true,
  headerBorder: false,
  headerFixed: false,
  footerFixed: true,
  layoutBoxed: false,
  menuItemFlat: false,
  menuChildIndent: false,
  layoutFixed: false
};

addWindowClass('layout-footer-fixed');

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebarMenu: (state) => {
      state.menuSidebarCollapsed = !state.menuSidebarCollapsed;
    },
    toggleControlSidebar: (state) => {
      state.controlSidebarCollapsed = !state.controlSidebarCollapsed;
    },
    toggleHeaderBorder: (state) => {
      state.headerBorder = !state.headerBorder;
    },
    toggleHeaderFixed: (state) => {
      state.headerFixed = !state.headerFixed;
      if (state.headerFixed) {
        addWindowClass('layout-navbar-fixed');
      } else {
        removeWindowClass('layout-navbar-fixed');
      }
    },
    toggleFooterFixed: (state) => {
      state.footerFixed = !state.footerFixed;
      if (state.footerFixed) {
        addWindowClass('layout-footer-fixed');
      } else {
        removeWindowClass('layout-footer-fixed');
      }
    },
    toggleLayoutBoxed: (state) => {
      state.layoutBoxed = !state.layoutBoxed;
      if (state.layoutBoxed) {
        addWindowClass('layout-boxed');
      } else {
        removeWindowClass('layout-boxed');
      }
    },
    toggleLayoutFixed: (state) => {
      state.layoutFixed = !state.layoutFixed;
      if (state.layoutFixed) {
        removeWindowClass('layout-fixed');
      } else {
        addWindowClass('layout-fixed');
      }
    },
    toggleMenuItemFlat: (state) => {
      state.menuItemFlat = !state.menuItemFlat;
    },
    toggleMenuChildIndent: (state) => {
      state.menuChildIndent = !state.menuChildIndent;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        state.navbarVariant = NAVBAR_DARK_VARIANTS[0].value;
        state.sidebarSkin = "sidebar-dark-olive" 
        addWindowClass('dark-mode');
        localStorage.setItem('darkmode', 'yes');
      } else {
        state.navbarVariant = NAVBAR_LIGHT_VARIANTS[0].value;
        state.sidebarSkin = "sidebar-light-olive";
        localStorage.setItem('darkmode', 'no');
        removeWindowClass('dark-mode');
      }
    },
    setDarkMode: (state, {payload}) => {
      console.log('setting darkmode', payload);
      state.darkMode = payload;
      if (state.darkMode) {
        state.navbarVariant = NAVBAR_DARK_VARIANTS[0].value;
        state.sidebarSkin = "sidebar-dark-olive" 
        addWindowClass('dark-mode');
        localStorage.setItem('darkmode', 'yes');
      } else {
        state.navbarVariant = NAVBAR_LIGHT_VARIANTS[0].value;
        state.sidebarSkin = "sidebar-light-olive";
        localStorage.setItem('darkmode', 'no');
        removeWindowClass('dark-mode');
      }
    },
    setNavbarVariant: (state, {payload}) => {
      if (state.darkMode) {
        state.navbarVariant = payload || NAVBAR_DARK_VARIANTS[0].value;
      } else {
        state.navbarVariant = payload || NAVBAR_LIGHT_VARIANTS[0].value;
      }
    },
    setSidebarSkin: (state, {payload}) => {
      if (state.darkMode) {
        state.sidebarSkin = payload || SIDEBAR_DARK_SKINS[0].value;
      } else {
        state.sidebarSkin = payload || SIDEBAR_LIGHT_SKINS[0].value;
      }
    },
    setWindowSize: (state, {payload}) => {
      state.screenSize = payload;
    }
  }
});

export const {
  toggleSidebarMenu,
  setWindowSize,
  toggleControlSidebar,
  toggleDarkMode,
  setDarkMode,
  setNavbarVariant,
  setSidebarSkin,
  toggleHeaderBorder,
  toggleHeaderFixed,
  toggleFooterFixed,
  toggleLayoutBoxed,
  toggleMenuItemFlat,
  toggleMenuChildIndent,
  toggleLayoutFixed
} = uiSlice.actions;

export default uiSlice.reducer;
