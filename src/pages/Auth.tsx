import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogIn, ShieldCheck } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user!.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        await supabase.auth.signOut();
        toast.error("Acesso restrito: apenas administradores podem fazer login.");
        return;
      }

      toast.success("Bem-vindo, administrador! 🛡️");
      navigate("/admin");
    } catch (error: any) {
      toast.error(error.message || "Falha ao entrar.");
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
            <div className="mx-auto mb-2 p-3 rounded-xl bg-accent/10 w-fit">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="font-heading text-2xl">Login Administrativo</CardTitle>
            <CardDescription>
              Esta área é restrita ao administrador da plataforma. Alunos não precisam fazer login —{" "}
              <Link to="/cadastro" className="text-foreground underline">cadastre-se aqui</Link>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90" disabled={loading}>
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Entrando..." : "Entrar como Admin"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
