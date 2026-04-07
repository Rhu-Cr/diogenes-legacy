import { GraduationCap, Heart, Lightbulb, Users } from "lucide-react";
import diogenesImg from "@/assets/diogenes.png";

const stats = [
  { icon: GraduationCap, label: "Anos de experiência", value: "20+" },
  { icon: Users, label: "Alunos formados", value: "5.000+" },
  { icon: Lightbulb, label: "Projetos orientados", value: "350+" },
  { icon: Heart, label: "Paixão por ensinar", value: "∞" },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-background" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-3 bg-gold-gradient rounded-full opacity-20 blur-xl" aria-hidden="true" />
              <div className="relative w-64 h-64 rounded-full bg-muted overflow-hidden border-4 border-accent/30">
                <img
                  src={diogenesImg}
                  alt="Professor Diógenes Carvalho Matias"
                  loading="lazy"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 id="about-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Conheça o Professor{" "}
              <span className="text-gradient">Diógenes</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Diógenes Carvalho Matias, 40 anos, é um apaixonado professor de Ciência da Computação.
              Após duas décadas formando profissionais brilhantes, decidiu criar esta plataforma
              para compartilhar seu legado com uma nova geração de estudantes.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Com seu estilo carismático e suas famosas metáforas computacionais, Diógenes transforma
              conceitos complexos em aprendizado acessível e divertido.
            </p>

            <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80 mb-10" role="quote">
              "Um bom algoritmo é como uma boa receita: tem os ingredientes certos, os passos na
              ordem certa, e no final, sempre dá um resultado delicioso!"
            </blockquote>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-6 w-6 text-accent mx-auto mb-2" aria-hidden="true" />
                  <div className="text-2xl font-bold text-foreground font-heading">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
