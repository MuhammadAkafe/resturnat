import { useEffect, useState, useCallback } from "react";

// Cache for authentication status to avoid repeated API calls


export function useVerify() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const checkAuth = useCallback(async () => {
        try {
            const response = await fetch("/api/verify", { 
                credentials: "include",
            });
            if (!response.ok) {
                setIsAdmin(false);
                return;
            }
            const data = await response.json();
            setIsAdmin(data.isAdmin);
        }
         catch (error) 
         {
            console.error("Auth check failed:", error);
            setIsAdmin(false);
        } 
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);



    return { isAdmin, isLoading };
}
