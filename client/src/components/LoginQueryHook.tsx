import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from '@/App'

const loginHook = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (values: { email: string; password: string }) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
            try {
                const res = await fetch(BASE_URL + "login", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                            Username: values.email,
                            Password: values.password
                        }),
                });


                clearTimeout(timeoutId); // Clear the timeout if the request succeeds

                // Check if the response is JSON
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text(); // Read the response as text
                    throw new Error(text || "Invalid response from server");
                }
                
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error)
                }
                return data;
            } catch (error) {
                console.error("Error in mutationFn:", error);
                throw error; // Re-throw the error for React Query to handle
            }
        }
    });
};

export default loginHook;