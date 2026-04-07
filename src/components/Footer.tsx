import { BookOpen, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-heading text-lg font-bold">
            <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />
            Legado de Diógenes
          </div>
          <p className="text-primary-foreground/60 text-sm text-center">
            Plataforma educacional criada com{" "}
            <Heart className="h-3.5 w-3.5 inline text-accent" aria-hidden="true" />{" "}
            pelo Prof. Diógenes Carvalho Matias
          </p>
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} — Projeto de Usabilidade Web
          </p>
        </div>
      </div>
    </footer>
  );
}
