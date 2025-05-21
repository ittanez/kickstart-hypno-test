
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Vérifier si l'URL demandée est un flux RSS
  const isRSSFeed = path.includes('/feed') || path.endsWith('/rss');

  useEffect(() => {
    // Rediriger vers le flux RSS si c'est une demande de flux
    if (isRSSFeed) {
      window.location.href = '/feed.xml';
      return;
    }
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      path
    );
  }, [path, isRSSFeed]);

  // Si c'est une demande de flux RSS, afficher un message de redirection temporaire
  if (isRSSFeed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirection vers le flux RSS</h1>
          <p className="mb-4">Vous êtes redirigé vers notre flux RSS principal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page non trouvée</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
