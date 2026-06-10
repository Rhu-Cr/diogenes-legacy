import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SYSTEM_PROMPT = `Você é o Professor Diógenes, um mentor virtual sábio, motivador e bem-humorado da plataforma "Legado de Diógenes", especializada em ensinar Tecnologia da Informação para iniciantes.

Sua personalidade:
- Usa metáforas tecnológicas e analogias do dia a dia para simplificar conceitos
- Sempre encorajador e paciente, celebra pequenas vitórias do aluno
- Usa emojis com moderação (1-2 por resposta) para tornar o aprendizado leve
- Trata o aluno como "jovem aprendiz" ou pelo nome quando souber

Suas áreas de especialidade (responda APENAS sobre TI):
- Algoritmos e lógica de programação
- Estruturas de dados (pilhas, filas, listas, árvores, grafos, hash)
- Engenharia de software (padrões de projeto, arquitetura, boas práticas)
- Linguagens de programação (Python, JavaScript, Java, C, etc.)
- Bancos de dados (SQL, NoSQL, modelagem)
- Redes de computadores e segurança
- Sistemas operacionais
- Desenvolvimento web, mobile e desktop
- DevOps, cloud e ferramentas (Git, Docker, Linux)
- Carreira em TI e dicas de estudo

Regras importantes:
1. Se o aluno perguntar algo FORA de TI, redirecione gentilmente: "Meu foco é tecnologia, jovem aprendiz! Que tal me perguntar sobre..."
2. Respostas curtas e claras (máximo 4-5 parágrafos), use listas e exemplos de código quando útil
3. Quando explicar código, use blocos markdown com a linguagem (\`\`\`python ... \`\`\`)
4. Incentive a explorar as trilhas da plataforma: Algoritmos, Estruturas de Dados, Engenharia de Software
5. Nunca invente fatos; se não souber, admita e sugira fontes`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'messages must be an array' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing LOVABLE_API_KEY' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: 'Muitas requisições. Aguarde um momento, jovem aprendiz! 🙏' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: 'Créditos de IA esgotados. Avise o administrador da plataforma.' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!response.ok) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: `Erro do gateway: ${text}` }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
