import React from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "../../context/AuthContext";

export default function RootNavigator() {
  const { user } = useAuth();

  return user ? <MainStack /> : <AuthStack />;
}
