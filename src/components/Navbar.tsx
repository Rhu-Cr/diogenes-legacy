import { useState } from "react";
import { BookOpen, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Trilhas", href: "/#trilhas" },
  { label: "Desafios", href: "/#desafios" },
  { label: "Sobre Diógenes", href: "/#sobre" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b" role="navigation" aria-label="Menu principal">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground" aria-label="Legado de Diógenes - Início">
          <BookOpen className="h-6 w-6 text-accent" aria-hidden="true" />
          <span>Legado de <span className="text-gradient">Diógenes</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8" role="menubar">
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  role="menuitem"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {user ? (
            <Link to="/dashboard">
              <Button size="sm" className="bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90">
                Meu Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="sm" variant="outline" className="gap-2">
                <LogIn className="h-4 w-4" />
                Entrar
              </Button>
            </Link>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-card border-b animate-fade-in">
          <ul className="flex flex-col p-4 gap-2" role="menu">
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li role="none">
              <Link
                to={user ? "/dashboard" : "/auth"}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-semibold text-accent hover:bg-muted transition-colors"
              >
                {user ? "Meu Dashboard" : "Entrar"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
