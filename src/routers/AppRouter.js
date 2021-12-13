import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { useDispatch } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import PublicRouter from "./PublicRouter";

import AuthRouter from "./AuthRouter";
import { auth } from "../firebase/firebase-config";
import { login } from "../actions/auth";

import {stratLoadingNotes } from "../actions/notes";
import JournalRouter from "./JournalRouter";
import { startLoadingImages } from "../actions/images";
import LoadingScreen from "../components/journal/LoadingScreen";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(stratLoadingNotes(user.uid));
        dispatch(startLoadingImages(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <div className="journal__main-content"><LoadingScreen /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRouter isAuthenticated={isLoggedIn}>
              <AuthRouter />
            </PublicRouter>
          }
        />

        <Route
          exact
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <JournalRouter />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
