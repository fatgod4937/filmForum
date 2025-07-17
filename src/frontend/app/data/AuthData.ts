export interface AuthModalProps {
    open: boolean;
    mode: "login" | "register" | null;
    onClose: () => void;
    setLoggedIn: (x: boolean) => void;
    onAuthSuccess?: () => void;
    onAuthError?: () => void;
}
export interface FormData {
    email: string;
    password: string;
}
