import React from "react";

import { auth } from "../firebase";

const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const currentUser = auth.currentUser;

    return { currentUser, loading: !currentUser };
  });

  const onChange = (currentUser) => {
    setState({ currentUser, loading: false });
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange);

    return () => unsubscribe;
  }, []);

  return state;
};

export default useAuth;
