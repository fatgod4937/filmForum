export interface AuthModalProps {
    open: boolean;
    mode: "login" | "register" | null;
    onClose: () => void;
    setLoggedIn: (x: boolean) => void;
}
export interface FormData {
    email: string;
    password: string;
}
