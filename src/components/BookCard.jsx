import { Link } from 'react-router-dom'
import './BookCard.css'

function BookCard({ book, index = 0 }) {
  const categoryColors = {
    'DevOps': 'var(--color-devops)',
    'Cloud': 'var(--color-cloud)',
    'Réseau': 'var(--color-reseau)',
    'Cybersécurité': 'var(--color-cybersecurite)',
    'Développement Web': 'var(--color-devweb)'
  }

  const color = categoryColors[book.category] || 'var(--color-accent)'

  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5 ? 1 : 0
    const empty = 5 - full - half
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
  }

  return (
    <Link
      to={`/livre/${book.id}`}
      className="book-card glass-card fade-in"
      style={{ animationDelay: `${index * 0.08}s` }}
      id={`book-card-${book.id}`}
    >
      <div className="book-card-cover">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x400/1a1a3e/6366F1?text=${encodeURIComponent(book.title.substring(0, 15))}`
          }}
        />
        <div className="book-card-overlay">
          <span className="book-card-view">Voir le détail →</span>
        </div>
        {!book.available && (
          <span className="book-card-unavailable">Indisponible</span>
        )}
      </div>

      <div className="book-card-body">
        <span
          className="badge book-card-category"
          style={{
            background: `${color}15`,
            color: color,
            border: `1px solid ${color}30`
          }}
        >
          {book.category}
        </span>

        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>

        <div className="book-card-footer">
          <span className="stars">{renderStars(book.rating)}</span>
          <span className="book-card-rating">{book.rating}</span>
        </div>
      </div>
    </Link>
  )
}

export default BookCard
