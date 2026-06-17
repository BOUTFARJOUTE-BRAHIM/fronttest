import { useState, useEffect } from 'react'
import { api } from '../services/api'
import './About.css'

function About() {
  const [stats, setStats] = useState(null)
  const [version, setVersion] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, versionRes] = await Promise.all([
          api.getStats(),
          api.getVersion()
        ])
        setStats(statsRes)
        setVersion(versionRes)
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
    fetchData()
  }, [])

  const techStack = [
    { name: 'React', icon: '⚛️', desc: 'Framework frontend pour des interfaces réactives', color: '#61DAFB' },
    { name: 'Vite', icon: '⚡', desc: 'Build tool ultra-rapide pour le développement', color: '#646CFF' },
    { name: 'Node.js', icon: '🟢', desc: 'Environnement d\'exécution JavaScript côté serveur', color: '#68A063' },
    { name: 'Express', icon: '🚂', desc: 'Framework web minimaliste pour l\'API REST', color: '#FFFFFF' },
    { name: 'REST API', icon: '🔗', desc: 'Architecture d\'API pour la communication client-serveur', color: '#FF6B6B' },
    { name: 'JSON', icon: '📦', desc: 'Format de stockage des données léger', color: '#F7DF1E' }
  ]

  const features = [
    { icon: '📚', title: 'Catalogue riche', desc: 'Plus de 20 livres dans 5 catégories IT' },
    { icon: '🔍', title: 'Recherche avancée', desc: 'Trouvez facilement par titre, auteur ou description' },
    { icon: '📊', title: 'Statistiques', desc: 'Tableau de bord avec des métriques en temps réel' },
    { icon: '📱', title: 'Responsive', desc: 'Interface adaptée à tous les appareils' },
    { icon: '🎨', title: 'Design moderne', desc: 'Interface premium avec glassmorphism et animations' },
    { icon: '⚡', title: 'Performance', desc: 'Chargement rapide grâce à Vite et React' }
  ]

  return (
    <div className="page about-page" id="about-page">
      <div className="container">
        <div className="about-header fade-in">
          <h1 className="section-title">À propos</h1>
          <p className="section-subtitle">
            Découvrez notre projet de bibliothèque numérique IT
          </p>
        </div>

        {/* Mission */}
        <section className="about-section fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="about-mission glass-card">
            <div className="mission-content">
              <h2>Notre mission</h2>
              <p>
                La <strong>Bibliothèque IT</strong> est un projet de bibliothèque numérique
                spécialisée dans les technologies de l'information. Notre objectif est de
                rassembler les meilleurs ouvrages dans les domaines du DevOps, du Cloud Computing,
                des Réseaux, de la Cybersécurité et du Développement Web.
              </p>
              <p>
                Ce projet est construit avec une architecture moderne frontend/backend,
                utilisant React avec Vite pour l'interface utilisateur et Node.js avec Express
                pour l'API REST. Les données sont stockées dans des fichiers JSON, sans base
                de données traditionnelle.
              </p>
            </div>
            <div className="mission-visual">
              <div className="orbit-container">
                <div className="orbit-center">📚</div>
                <div className="orbit-ring orbit-ring-1">
                  <span className="orbit-item" style={{ animationDelay: '0s' }}>🔄</span>
                </div>
                <div className="orbit-ring orbit-ring-2">
                  <span className="orbit-item" style={{ animationDelay: '-5s' }}>☁️</span>
                </div>
                <div className="orbit-ring orbit-ring-3">
                  <span className="orbit-item" style={{ animationDelay: '-10s' }}>🔒</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="about-section" id="features-section">
          <h2 className="section-title">Fonctionnalités</h2>
          <p className="section-subtitle">Ce que notre application offre</p>
          <div className="features-grid">
            {features.map((feat, i) => (
              <div className="feature-card glass-card fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="feature-icon">{feat.icon}</span>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="about-section" id="tech-section">
          <h2 className="section-title">Stack technique</h2>
          <p className="section-subtitle">Les technologies utilisées dans ce projet</p>
          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div className="tech-card glass-card fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="tech-icon">{tech.icon}</span>
                <h3 style={{ color: tech.color }}>{tech.name}</h3>
                <p>{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="about-section" id="architecture-section">
          <h2 className="section-title">Architecture</h2>
          <p className="section-subtitle">Vue d'ensemble de l'architecture du projet</p>
          <div className="architecture glass-card fade-in">
            <div className="arch-layer">
              <div className="arch-box arch-frontend">
                <h3>🖥️ Frontend</h3>
                <ul>
                  <li>React + Vite</li>
                  <li>React Router</li>
                  <li>CSS Vanilla</li>
                  <li>Port: 5173</li>
                </ul>
              </div>
              <div className="arch-arrow">
                <span>REST API</span>
                <div className="arrow-line"></div>
                <span>HTTP / JSON</span>
              </div>
              <div className="arch-box arch-backend">
                <h3>⚙️ Backend</h3>
                <ul>
                  <li>Node.js + Express</li>
                  <li>CORS + Morgan</li>
                  <li>Fichiers JSON</li>
                  <li>Port: 5000</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Version Info */}
        {version && (
          <section className="about-section" id="version-section">
            <div className="version-card glass-card fade-in">
              <h3>ℹ️ Informations système</h3>
              <div className="version-grid">
                <div className="version-item">
                  <span className="version-label">Application</span>
                  <span className="version-value">{version.name}</span>
                </div>
                <div className="version-item">
                  <span className="version-label">Version API</span>
                  <span className="version-value">{version.version}</span>
                </div>
                <div className="version-item">
                  <span className="version-label">Environnement</span>
                  <span className="version-value">{version.environment}</span>
                </div>
                <div className="version-item">
                  <span className="version-label">Node.js</span>
                  <span className="version-value">{version.node}</span>
                </div>
                {stats && (
                  <>
                    <div className="version-item">
                      <span className="version-label">Total livres</span>
                      <span className="version-value">{stats.totalBooks}</span>
                    </div>
                    <div className="version-item">
                      <span className="version-label">Catégories</span>
                      <span className="version-value">{stats.totalCategories}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default About
