import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "O que é um algoritmo, afinal?",
    answer:
      "Imagine que você está ensinando um robô a fazer café. Cada passo — pegar a xícara, ferver a água, coar — precisa ser claro e em ordem. Isso é um algoritmo! Se você pular o passo de colocar o pó, vai beber água quente pura. E ninguém quer isso, né? ☕",
  },
  {
    question: "Preciso saber matemática para programar?",
    answer:
      "Olha, precisa tanto quanto um piloto precisa saber construir um avião: não precisa ser engenheiro aeronáutico, mas entender os instrumentos ajuda! Lógica é sua pista de decolagem, o resto a gente aprende voando. 🛫",
  },
  {
    question: "Qual linguagem de programação devo aprender primeiro?",
    answer:
      "Essa pergunta é tipo perguntar 'qual garfo devo usar primeiro num jantar chique?' — todos servem pra comer! Comece com uma que te faça feliz. Python é como um canivete suíço, JavaScript é o Wi-Fi do desenvolvimento (tá em todo lugar), e C é como aprender a dirigir com câmbio manual: difícil, mas depois você dirige qualquer coisa! 🔧",
  },
  {
    question: "O que é um bug?",
    answer:
      "Um bug é quando o computador faz exatamente o que você mandou — mas não o que você queria. É como pedir ao GPS 'me leve à padaria mais próxima' e ele te levar pra uma padaria no Japão. Tecnicamente ele acertou... mas errou feio! 🐛",
  },
  {
    question: "Como sei que estou progredindo?",
    answer:
      "Se ontem seu código tinha 10 erros e hoje tem 3 — parabéns, você reduziu 70% dos bugs! Em qualquer outra profissão isso seria promoção instantânea. Na programação, a gente chama de terça-feira. Mas aqui na plataforma, suas barras de progresso e pontos mostram exatamente onde você está! 📊",
  },
  {
    question: "O que é Engenharia de Software?",
    answer:
      "Se programar é como cozinhar, Engenharia de Software é administrar o restaurante inteiro. Não basta fazer um prato gostoso — precisa ter cardápio, estoque, equipe, e o cliente não pode esperar 3 horas. É a arte de construir software que funciona, escala e não vira uma bagunça! 🏗️",
  },
  {
    question: "Posso aprender no meu próprio ritmo?",
    answer:
      "Claro! Aqui não tem 'tempo de compilação' forçado. Cada pessoa é como um processador diferente — uns são i3, outros são i9, mas todos chegam no resultado. O importante é não dar 'segfault' no meio do caminho (ou seja: não desistir!). Vá no seu tempo, o conhecimento não tem prazo de validade. ⏰",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            O Prof. Diógenes responde as dúvidas mais comuns — com humor e metáforas, como sempre! 😄
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border/50 rounded-xl px-6 shadow-card"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
