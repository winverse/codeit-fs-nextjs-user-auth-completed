"use client";

import { createContext, useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getMe, login, logout, updateMe } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: user, isPending } = useQuery({
    queryKey: queryKeys.me.info(),
    queryFn: () => getMe(),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.me.info() }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => queryClient.resetQueries({ queryKey: queryKeys.me.all() }),
  });

  const updateMeMutation = useMutation({
    mutationFn: (formData) => updateMe(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.me.info() }),
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        updateMe: updateMeMutation.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required) {
  const context = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push("/login");
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
