import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Address {
  pincode: string;
  local_address: string;
  state: string;
  city: string;
  district: string;
  country: string;
  landmark: string;
  addressName: string;
  addressname: string;
  id: string;
}

export interface User {
  id: string;
  username: string;
  authority_id: number;
  authority: string;
  firstname: string;
  lastname: string;
  email: string;
  number: string;
  password: string;
  addresses: Address[];
}

interface UserState {
  users: User[]; // All registered users
  loggedInUser?: User; // The user who is logged in
  isAuthenticated: boolean;
  error: any;
  loading: boolean;
  profileLoading: boolean;
}

const initialState: UserState = {
  users: [
    {
      id: "1744885326220", // Static ID for admin
      username: "admin", // Static username for admin
      authority_id: 1, // Higher authority ID for admin
      authority: "ROLE_ADMIN", // Admin role
      firstname: "Admin",
      lastname: "User",
      email: "admin@mail.com", // Static email for admin
      number: "1234567890", // Static phone number
      password: "admin", // Static password (hashed ideally, but this is mock)
      addresses: [],
    },
  ], // Empty until signup
  // loggedInUser: undefined,
  loggedInUser: {
    id: "1744885326220", // Static ID for admin
    username: "admin", // Static username for admin
    authority_id: 1, // Higher authority ID for admin
    authority: "ROLE_ADMIN", // Admin role
    firstname: "Admin",
    lastname: "User",
    email: "admin@mail.com", // Static email for admin
    number: "1234567890", // Static phone number
    password: "admin", // Static password (hashed ideally, but this is mock)
    addresses: [],
  },
  isAuthenticated: true,
  error: null,
  loading: false,
  profileLoading: false,
};

// 🧾 MOCK SIGNUP
export const mockSignup = createAsyncThunk(
  "user/mockSignup",
  async (data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const fakeUser: User = {
      id: Date.now().toString(),
      username: data.name,
      authority_id: 2,
      authority: "ROLE_USER",
      firstname: data.name.split(" ")[0],
      lastname: data.name.split(" ")[1] || "",
      email: data.email,
      number: data.phone,
      password: data.password,
      addresses: [],
    };
    console.log(fakeUser);
    return fakeUser;
  }
);

// 🔐 MOCK LOGIN
export const mockLogin = createAsyncThunk(
  "user/mockLogin",
  async (data: { email: string; password: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    // Check if the email exists in the users list
    const foundUser = state.user.users.find(
      (user) => user.email === data.email
    );

    if (!foundUser) {
      // If no user is found with the email, return a custom error message
      return thunkAPI.rejectWithValue("This user does not exist.");
    }

    // If the email is found, check if the password is correct
    if (foundUser.password !== data.password) {
      return thunkAPI.rejectWithValue("Invalid password.");
    }

    // If the email and password match, generate a token and log the user in
    const token =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("token", token);
    return foundUser;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.loggedInUser = undefined;
      state.isAuthenticated = false;
    },
    resetStore: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mockSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(mockSignup.fulfilled, (state, action) => {
        state.users.push(action.payload); // Save new user
        state.loading = false;
      })
      .addCase(mockSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(mockLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(mockLogin.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(mockLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout, resetStore } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
export const selectLoading = (state: RootState) => state.user.loading;
