import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import BookCard from '../components/BookCard'
import './Home.css'

function Home() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksRes, catsRes, statsRes] = await Promise.all([
          api.getBooks(),
          api.getCategories(),
          api.getStats()
        ])
        setBooks(booksRes.books)
        setCategories(catsRes.categories)
        setStats(statsRes)
      } catch (err) {
        console.error('Erreur chargement:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const featuredBooks = books.filter(b => b.rating >= 4.7).slice(0, 4)

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text fade-in">
            <span className="hero-badge">📖 Bibliothèque Numérique</span>
            <h1 className="hero-title">
              Explorez le monde de
              <span className="hero-highlight"> l'IT</span>
            </h1>
            <p className="hero-desc">
              Découvrez notre collection de plus de {books.length} livres couvrant
              les domaines essentiels de l'informatique : DevOps, Cloud, Réseau,
              Cybersécurité et Développement Web.
            </p>
            <div className="hero-actions">
              <Link to="/catalogue" className="btn-primary" id="hero-cta">
                📚 Explorer le catalogue
              </Link>
              <Link to="/a-propos" className="btn-secondary">
                En savoir plus →
              </Link>
            </div>
          </div>

          {stats && (
            <div className="hero-stats fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="stat-card glass-card">
                <span className="stat-number">{stats.totalBooks}</span>
                <span className="stat-label">Livres</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-number">{stats.totalCategories}</span>
                <span className="stat-label">Catégories</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-number">{stats.avgRating}</span>
                <span className="stat-label">Note moyenne</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-number">{stats.availableBooks}</span>
                <span className="stat-label">Disponibles</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-section" id="categories-section">
        <div className="container">
          <h2 className="section-title">Nos Catégories</h2>
          <p className="section-subtitle">
            Explorez nos collections spécialisées en technologies de l'information
          </p>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link
                to={`/catalogue?category=${encodeURIComponent(cat.name)}`}
                className="category-card glass-card fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                key={cat.id}
                id={`category-${cat.slug}`}
              >
                <div className="category-icon" style={{ background: `${cat.color}15` }}>
                  <span>{cat.icon}</span>
                </div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.description}</p>
                <span className="category-count" style={{ color: cat.color }}>
                  {cat.bookCount} livre{cat.bookCount > 1 ? 's' : ''}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="home-section" id="featured-section">
        <div className="container">
          <h2 className="section-title">Livres à la une</h2>
          <p className="section-subtitle">
            Les ouvrages les mieux notés de notre collection
          </p>
          <div className="books-grid">
            {featuredBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/catalogue" className="btn-primary" id="see-all-books">
              Voir tous les livres →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div className="container">
          <div className="cta-card glass-card">
            <div className="cta-content">
              <h2 className="cta-title">Une question ? Un avis ?</h2>
              <p className="cta-desc">
                N'hésitez pas à nous contacter pour toute question sur notre collection
                ou pour suggérer de nouveaux livres à ajouter.
              </p>
              <Link to="/contact" className="btn-primary" id="cta-contact">
                📧 Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
