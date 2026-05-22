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
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento inválida")
    .refine((v) => {
      const d = new Date(v);
      return !isNaN(d.getTime()) && d <= new Date() && d >= new Date("1900-01-01");
    }, "Data de nascimento inválida"),
  email: z.string().trim().email("E-mail inválido").max(255),
  cpf: z.string().trim().regex(/^\d{11}$/, "CPF deve ter 11 dígitos (somente números)"),
  phone: z.string().trim().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos (DDD + número)"),
  cep: z.string().trim().regex(/^\d{8}$/, "CEP deve ter 8 dígitos (somente números)"),
  city: z.string().trim().min(2, "Cidade muito curta").max(120),
});

function calcAge(birth: string): number {
  const b = new Date(birth);
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age;
}

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsed = schema.safeParse({
        fullName,
        birthDate,
        email,
        cpf: cpf.replace(/\D/g, ""),
        phone: phone.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        city,
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
          birth_date: parsed.data.birthDate,
          age: calcAge(parsed.data.birthDate),
          email: parsed.data.email,
          cpf: parsed.data.cpf,
          phone: parsed.data.phone,
          cep: parsed.data.cep,
          city: parsed.data.city,
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
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required max={new Date().toISOString().slice(0, 10)} />
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
              <div className="space-y-2">
                <Label htmlFor="cep">CEP (somente números)</Label>
                <Input id="cep" inputMode="numeric" value={cep} onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))} required maxLength={8} placeholder="00000000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required maxLength={120} placeholder="São Paulo" />
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
