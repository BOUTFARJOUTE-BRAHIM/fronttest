import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">
                Bibliothèque<span className="logo-accent">IT</span>
              </span>
            </Link>
            <p className="footer-desc">
              Votre bibliothèque spécialisée en technologies de l'information.
              Découvrez notre collection de livres en DevOps, Cloud, Réseau,
              Cybersécurité et Développement Web.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <nav className="footer-links">
              <Link to="/">Accueil</Link>
              <Link to="/catalogue">Catalogue</Link>
              <Link to="/a-propos">À propos</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Catégories</h4>
            <nav className="footer-links">
              <Link to="/catalogue?category=DevOps">DevOps</Link>
              <Link to="/catalogue?category=Cloud">Cloud</Link>
              <Link to="/catalogue?category=Réseau">Réseau</Link>
              <Link to="/catalogue?category=Cybersécurité">Cybersécurité</Link>
              <Link to="/catalogue?category=Développement Web">Développement Web</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact">
              <p>📧 contact@bibliotheque-it.fr</p>
              <p>📞 +33 1 23 45 67 89</p>
              <p>📍 Paris, France</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Bibliothèque IT. Tous droits réservés.</p>
          <p className="footer-tech">
            Fait avec ❤️ en React + Express
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
