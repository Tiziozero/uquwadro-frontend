import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export  interface User {
  id: string;
  username: string;
  email: string;
  pfp: string;
  isLoggedIn: boolean;
}

const initialState: User = {
  id: '',
  username: '',
  email: '',
  pfp: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: (state) => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
  },
});


export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

