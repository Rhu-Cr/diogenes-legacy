import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  to?: string;
}

export function BackButton({ label = "Voltar", to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="gap-2 text-muted-foreground hover:text-foreground"
      aria-label={label}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
