
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Assurer une hydratation correcte pour le site statique
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Élément racine non trouvé");

const root = createRoot(rootElement);
root.render(<App />);
