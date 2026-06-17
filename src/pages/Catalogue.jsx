import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../services/api'
import BookCard from '../components/BookCard'
import './Catalogue.css'

function Catalogue() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('category') || ''

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.getCategories()
        setCategories(res.categories)
      } catch (err) {
        console.error('Erreur catégories:', err)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (activeCategory) params.set('category', activeCategory)
        if (searchQuery) params.set('search', searchQuery)
        const res = await api.getBooks(params.toString())
        setBooks(res.books)
      } catch (err) {
        console.error('Erreur livres:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [activeCategory, searchQuery])

  const handleCategoryClick = (catName) => {
    if (activeCategory === catName) {
      setSearchParams({})
    } else {
      setSearchParams({ category: catName })
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // search is triggered by useEffect on searchQuery change
  }

  return (
    <div className="page catalogue-page" id="catalogue-page">
      <div className="container">
        <div className="catalogue-header fade-in">
          <h1 className="section-title">Catalogue des livres</h1>
          <p className="section-subtitle">
            Parcourez notre collection complète d'ouvrages IT
          </p>
        </div>

        {/* Search & Filters */}
        <div className="catalogue-filters fade-in" style={{ animationDelay: '0.1s' }}>
          <form className="search-form" onSubmit={handleSearch} id="search-form">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un livre, un auteur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery('')}
                id="search-clear"
              >
                ✕
              </button>
            )}
          </form>

          <div className="category-filters">
            <button
              className={`filter-btn ${!activeCategory ? 'active' : ''}`}
              onClick={() => setSearchParams({})}
              id="filter-all"
            >
              Tous
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
                style={activeCategory === cat.name ? { borderColor: cat.color, color: cat.color, background: `${cat.color}10` } : {}}
                id={`filter-${cat.slug}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="catalogue-info">
          <p>
            {loading ? 'Chargement...' : (
              <>
                <strong>{books.length}</strong> livre{books.length > 1 ? 's' : ''} trouvé{books.length > 1 ? 's' : ''}
                {activeCategory && <span> dans <strong>{activeCategory}</strong></span>}
                {searchQuery && <span> pour "<strong>{searchQuery}</strong>"</span>}
              </>
            )}
          </p>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Chargement des livres...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="books-grid">
            {books.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        ) : (
          <div className="catalogue-empty">
            <span className="empty-icon">📭</span>
            <h3>Aucun livre trouvé</h3>
            <p>Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalogue
