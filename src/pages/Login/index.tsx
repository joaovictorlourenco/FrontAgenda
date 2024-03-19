import logo from "@/assets/logo.png";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";

import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getUser, loginUser } from "@/services/user";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import userStore from "@/store/userStore";

const loginSchem = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof loginSchem>;

export default function index() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: async (data) => {
      try {
        const result = loginSchem.parse(data);
        return {
          values: result,
          errors: {},
        };
      } catch (error) {
        return {
          values: {},
          errors: {
            email: {
              message: "Seu email ou senha estão incorretos",
              type: "manual",
            },
            password: {
              message: "Seu email ou senha estão incorretos",
              type: "manual",
            },
          },
        };
      }
    },
  });

  const handleCadastro = () => {
    navigate("/cadastro");
  };

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const response = await loginUser(email, password);

    if (response.status === 400) {
      setError("email", { message: "Email ou senha estão incorretos" });
      setError("password", { message: "Email ou senha estão incorretos" });
      return;
    }

    const { access_token } = response;

    const { id, name, email: emailData } = await getUser(access_token, email);

    userStore.setState({ token: access_token, id, name, email: emailData });

    navigate("/dashboard");
  };

  return (
    <div className="mx-auto w-full h-full flex-col flex items-center justify-center">
      <img src={logo} alt="Logo" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-11 min-h-52 w-80"
      >
        <div className="flex flex-col gap-3 mb-4">
          <div>
            {errors.email && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Seu Email ou Senha estão incorretos
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            placeholder="Seu email"
            type="email"
            className="h-11 w-full"
          />
          <Label htmlFor="email">Senha</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Sua senha"
            className="h-11 w-full"
          />

          <Button variant="link" onClick={handleCadastro} className="h-6 w-44">
            Ainda não tem cadastro?
          </Button>
        </div>

        <Button className="h-11" type="submit">
          {isLoading ? (
            <ReloadIcon className="h-6 w-6 animate-spin" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </div>
  );
}
