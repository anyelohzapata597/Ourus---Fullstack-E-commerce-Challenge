import { useState, FC } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCartStore, useAuthStore } from '@stores/index'

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { getItemCount } = useCartStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const itemCount = getItemCount()
  const displayName = user?.name || user?.email?.split('@')[0] || 'Usuario'
  const displayEmail = user?.email || 'Sin correo registrado'

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
    { path: '/about', label: 'Acerca de' },
  ]

  const isActive = (path: string) => pathname === path

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
    setIsUserDropdownOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMenus()
    navigate('/')
  }

  return (
    <nav className="site-navbar" aria-label="Navegacion principal">
      <div className="site-navbar__inner">
        <div className="site-navbar__bar">
          <Link to="/" className="site-navbar__brand" onClick={closeMenus}>
            <span className="site-navbar__brand-mark" aria-hidden="true">O</span>
            <span>Ourus</span>
          </Link>

          <div className="site-navbar__desktop">
            <div className="site-navbar__links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `site-navbar__link ${isActive ? 'site-navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                closeMenus()
                navigate('/cart')
              }}
              className={`site-navbar__cart ${isActive('/cart') ? 'site-navbar__cart--active' : ''}`}
            >
              <span aria-hidden="true">🛒</span>
              <span>Carrito</span>
              {itemCount > 0 && (
                <span className="site-navbar__cart-badge" aria-label={`${itemCount} productos en el carrito`}>
                  {itemCount}
                </span>
              )}
            </button>

            <div className="site-navbar__auth">
              {isAuthenticated && user ? (
                <div className="site-navbar__user">
                  <button
                    type="button"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="site-navbar__user-button"
                    aria-expanded={isUserDropdownOpen}
                  >
                    <span className="site-navbar__avatar" aria-hidden="true">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                    <span>{displayName}</span>
                    <span className={`site-navbar__chevron ${isUserDropdownOpen ? 'site-navbar__chevron--open' : ''}`}>
                      ▾
                    </span>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="site-navbar__dropdown">
                      <div className="site-navbar__dropdown-header">
                        <p>{displayEmail}</p>
                        <span>{user.role || 'customer'}</span>
                      </div>
                      <Link to="/" onClick={() => setIsUserDropdownOpen(false)}>Mi perfil</Link>
                      <Link to="/" onClick={() => setIsUserDropdownOpen(false)}>Mis ordenes</Link>
                      <Link to="/" onClick={() => setIsUserDropdownOpen(false)}>Configuracion</Link>
                      <button type="button" onClick={handleLogout}>Cerrar sesion</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/auth/login" className="site-navbar__login">
                    Iniciar sesion
                  </Link>
                  <Link to="/auth/register" className="site-navbar__register">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="site-navbar__menu-button"
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="site-navbar__mobile">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenus}
                className={isActive(link.path) ? 'site-navbar__mobile-link site-navbar__mobile-link--active' : 'site-navbar__mobile-link'}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                closeMenus()
                navigate('/cart')
              }}
              className={isActive('/cart') ? 'site-navbar__mobile-link site-navbar__mobile-link--active' : 'site-navbar__mobile-link'}
            >
              Carrito
              {itemCount > 0 && <span className="site-navbar__mobile-badge">{itemCount}</span>}
            </button>

            <div className="site-navbar__mobile-auth">
              {isAuthenticated && user ? (
                <>
                  <div className="site-navbar__mobile-user">
                    <strong>{displayName}</strong>
                    <span>{displayEmail}</span>
                  </div>
                  <button type="button" onClick={handleLogout} className="site-navbar__mobile-logout">
                    Cerrar sesion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" onClick={closeMenus} className="site-navbar__mobile-link">
                    Iniciar sesion
                  </Link>
                  <Link to="/auth/register" onClick={closeMenus} className="site-navbar__mobile-register">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
