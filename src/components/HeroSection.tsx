import { ArrowDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import diogenesImg from "@/assets/diogenes.png";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      </div>

      <div className="container relative mx-auto px-4 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Plataforma Educacional Interativa
          </div>
          <h1 id="hero-heading" className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            O Legado de{" "}
            <span className="text-gradient">Diógenes</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 leading-relaxed">
            "A melhor forma de aprender é ensinar. E a melhor forma de ensinar é
            compartilhar." — Aprenda algoritmos, estruturas de dados e engenharia
            de software com o Professor Diógenes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-gold-gradient text-secondary-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity text-base px-8"
              asChild
            >
              <Link to="/auth?returnUrl=%2Fdashboard">Começar Jornada</Link>
            </Button>
            <Button
              size="lg"
              className="bg-gold-gradient text-secondary-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity text-base px-8"
              asChild
            >
              <a href="#sobre">Conhecer Diógenes</a>
            </Button>
          </div>
        </div>

        {/* Character */}
        <div className="flex-shrink-0 animate-float" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gold/20 rounded-full blur-2xl" aria-hidden="true" />
            <img
              src={diogenesImg}
              alt="Professor Diógenes Carvalho Matias sorrindo e apontando para frente"
              width={380}
              height={380}
              className="relative drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trilhas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce"
        aria-label="Rolar para trilhas de aprendizado"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  );
}
