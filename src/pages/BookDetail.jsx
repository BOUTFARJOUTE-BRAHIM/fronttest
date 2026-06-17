import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import BookCard from '../components/BookCard'
import './BookDetail.css'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBook() {
      setLoading(true)
      setError(null)
      try {
        const res = await api.getBook(id)
        setBook(res.book)
        setSimilar(res.similar)
      } catch (err) {
        setError('Livre non trouvé')
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
    window.scrollTo(0, 0)
  }, [id])

  const categoryColors = {
    'DevOps': 'var(--color-devops)',
    'Cloud': 'var(--color-cloud)',
    'Réseau': 'var(--color-reseau)',
    'Cybersécurité': 'var(--color-cybersecurite)',
    'Développement Web': 'var(--color-devweb)'
  }

  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5 ? 1 : 0
    const empty = 5 - full - half
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
  }

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Chargement du livre...</p>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="page">
        <div className="container">
          <div className="detail-error">
            <span className="error-icon">📕</span>
            <h2>Livre non trouvé</h2>
            <p>Le livre que vous cherchez n'existe pas dans notre catalogue.</p>
            <Link to="/catalogue" className="btn-primary">
              ← Retour au catalogue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const color = categoryColors[book.category] || 'var(--color-accent)'

  return (
    <div className="page detail-page" id="book-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb fade-in" id="breadcrumb">
          <Link to="/">Accueil</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/catalogue">Catalogue</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to={`/catalogue?category=${encodeURIComponent(book.category)}`}>{book.category}</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{book.title}</span>
        </nav>

        {/* Book Detail */}
        <div className="detail-content">
          <div className="detail-cover fade-in">
            <div className="cover-wrapper glass-card">
              <img
                src={book.cover}
                alt={book.title}
                onError={(e) => {
                  e.target.src = `https://placehold.co/400x500/1a1a3e/6366F1?text=${encodeURIComponent(book.title.substring(0, 15))}`
                }}
              />
            </div>
            <div className="detail-availability" style={{
              background: book.available ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${book.available ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: book.available ? 'var(--color-success)' : 'var(--color-danger)'
            }}>
              {book.available ? '✅ Disponible' : '❌ Indisponible'}
            </div>
          </div>

          <div className="detail-info fade-in" style={{ animationDelay: '0.15s' }}>
            <span
              className="badge detail-category"
              style={{
                background: `${color}15`,
                color: color,
                border: `1px solid ${color}30`
              }}
            >
              {book.category}
            </span>

            <h1 className="detail-title">{book.title}</h1>
            <p className="detail-author">par <strong>{book.author}</strong></p>

            <div className="detail-rating">
              <span className="stars">{renderStars(book.rating)}</span>
              <span className="detail-rating-number">{book.rating} / 5</span>
            </div>

            <p className="detail-description">{book.description}</p>

            <div className="detail-meta glass-card">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <div>
                  <span className="meta-label">Année</span>
                  <span className="meta-value">{book.year}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📄</span>
                <div>
                  <span className="meta-label">Pages</span>
                  <span className="meta-value">{book.pages}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🌍</span>
                <div>
                  <span className="meta-label">Langue</span>
                  <span className="meta-value">{book.language}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🏢</span>
                <div>
                  <span className="meta-label">Éditeur</span>
                  <span className="meta-value">{book.publisher}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📖</span>
                <div>
                  <span className="meta-label">ISBN</span>
                  <span className="meta-value">{book.isbn}</span>
                </div>
              </div>
            </div>

            <Link to="/catalogue" className="btn-secondary" id="back-to-catalogue">
              ← Retour au catalogue
            </Link>
          </div>
        </div>

        {/* Similar Books */}
        {similar.length > 0 && (
          <section className="detail-similar" id="similar-books">
            <h2 className="section-title">Livres similaires</h2>
            <p className="section-subtitle">
              Autres ouvrages dans la catégorie {book.category}
            </p>
            <div className="books-grid">
              {similar.map((b, i) => (
                <BookCard key={b.id} book={b} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default BookDetail
