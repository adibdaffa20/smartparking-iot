import { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create a context
const AuthContext = createContext();

// Provide the auth context to the rest of the app
export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Use the auth context in components
export function useAuth() {
  return useContext(AuthContext);
}
