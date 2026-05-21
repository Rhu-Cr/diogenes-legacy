import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, UserPlus } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(3, "Nome muito curto").max(120),
  age: z.coerce.number().int().min(10, "Idade mínima 10").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  cpf: z.string().trim().regex(/^\d{11}$/, "CPF deve ter 11 dígitos (somente números)"),
  phone: z.string().trim().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos (DDD + número)"),
  cep: z.string().trim().regex(/^\d{8}$/, "CEP deve ter 8 dígitos (somente números)"),
});

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsed = schema.safeParse({
        fullName,
        age,
        email,
        cpf: cpf.replace(/\D/g, ""),
        phone: phone.replace(/\D/g, ""),
      });
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .insert({
          full_name: parsed.data.fullName,
          age: parsed.data.age,
          email: parsed.data.email,
          cpf: parsed.data.cpf,
          phone: parsed.data.phone,
        })
        .select("id, full_name")
        .single();

      if (error) {
        if (error.code === "23505") {
          toast.error("Este CPF já está cadastrado.");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      localStorage.setItem("student_id", data.id);
      localStorage.setItem("student_name", data.full_name);
      toast.success(`Bem-vindo(a), ${data.full_name}! Bons estudos! 🎓`);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro ao cadastrar.");
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
            <CardTitle className="font-heading text-2xl">Cadastro do Aluno</CardTitle>
            <CardDescription>
              Preencha seus dados para liberar todas as aulas. Não é necessário criar senha!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={120} placeholder="João da Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input id="age" type="number" min={10} max={120} value={age} onChange={(e) => setAge(e.target.value)} required placeholder="17" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF (somente números)</Label>
                <Input id="cpf" inputMode="numeric" value={cpf} onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))} required maxLength={11} placeholder="00000000000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (DDD + número)</Label>
                <Input id="phone" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} required maxLength={11} placeholder="11999998888" />
              </div>

              <Button type="submit" className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90" disabled={loading}>
                <UserPlus className="h-4 w-4 mr-2" />
                {loading ? "Cadastrando..." : "Começar a Estudar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              É administrador?{" "}
              <Link to="/auth" className="text-foreground hover:underline">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
