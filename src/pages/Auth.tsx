import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogIn, UserPlus } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";
import { z } from "zod";

const signupSchema = z.object({
  fullName: z.string().trim().min(3, "Nome muito curto").max(120),
  age: z.coerce.number().int().min(10, "Idade mínima 10").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  cpf: z.string().trim().regex(/^\d{11}$/, "CPF deve ter 11 dígitos (somente números)"),
  password: z.string().min(6, "Senha mínima de 6 caracteres").max(72),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta! O Prof. Diógenes está feliz em vê-lo! 🎓");
        navigate("/dashboard");
      } else {
        const cleanCpf = cpf.replace(/\D/g, "");
        const parsed = signupSchema.safeParse({ fullName, age, email, cpf: cleanCpf, password });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: parsed.data.fullName,
              age: parsed.data.age,
              cpf: parsed.data.cpf,
            },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email para confirmar. 📧");
      }
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <BackButton label="Voltar ao Início" to="/" />
        </div>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
            <BookOpen className="h-7 w-7 text-accent" aria-hidden="true" />
            Legado de <span className="text-gradient">Diógenes</span>
          </Link>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">
              {isLogin ? "Entrar na Plataforma" : "Criar Conta de Aluno"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? '"Cada login é um novo commit na sua jornada!" — Prof. Diógenes'
                : "Preencha seus dados para começar a aprender"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="João da Silva"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      maxLength={120}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="17"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      min={10}
                      max={120}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF (somente números)</Label>
                    <Input
                      id="cpf"
                      type="text"
                      inputMode="numeric"
                      placeholder="00000000000"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
                      required
                      maxLength={11}
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  "Processando..."
                ) : isLogin ? (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Conta
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-2 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
