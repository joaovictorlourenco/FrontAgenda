import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const cadastroSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3).max(30),
});

type FormData = z.infer<typeof cadastroSchema>;

export default function Cadastro() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = async ({ name, email, password }: FormData) => {
    const response = await registerUser(name, email, password);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (response.status === 201) {
      navigate("/");
    }

    if (response.response.status === 400) {
      return setError("email", {
        type: "manual",
        message: "Email já cadastrado",
      });
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto w-full h-full flex-col flex items-center justify-center">
      <img src={logo} alt="Logo" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-11 min-h-52 w-80"
      >
        <div className="flex flex-col gap-3 mb-4">
          <Label>Nome</Label>
          <Input type="text" placeholder="Seu Nome" {...register("name")} />
          {errors.name && (
            <p className="text-red-500">
              {" Tem que ser entre 3 ou 30 caracteres"}
            </p>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            placeholder="Seu email"
            type="email"
            className="h-11 w-full"
          />
          {errors.email && (
            <p className="text-red-500">{"Formato de email inválido"}</p>
          )}
          <Label htmlFor="email">Senha</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Sua senha"
            className="h-11 w-full"
          />
          {errors.password && (
            <p className="text-red-500">
              {"Senha tem que ter no mínimo 8 caracteres"}
            </p>
          )}
          <div className="flex justify-start ">
            <Button variant="link" className="h-6 px-0" onClick={handleLogin}>
              Já tem cadastro?
            </Button>
          </div>
        </div>

        <Button type="submit">
          {isLoading ? (
            <ReloadIcon className="h-6 w-6 animate-spin" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </div>
  );
}
