/**
 * Fait défiler la page vers le haut de manière fluide
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior
  });
};

/**
 * Fait défiler vers un élément spécifique
 */
export const scrollToElement = (elementId: string, behavior: ScrollBehavior = 'smooth') => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior,
      block: 'start'
    });
  }
};

/**
 * Fait défiler vers le début du contenu principal (après le header)
 */
export const scrollToMainContent = (behavior: ScrollBehavior = 'smooth') => {
  // Scroll un peu en dessous du header sticky (hauteur ~80px)
  window.scrollTo({
    top: 100,
    behavior
  });
};