import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/theme.css";
import './index.css'
import App from './App.tsx'
import "./styles/animations.css";
import { AuthProvider } from './contexts/AuthProvider.tsx';



createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
