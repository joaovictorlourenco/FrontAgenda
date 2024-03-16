import logo from "@/assets/logo.png";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { loginUser } from "@/services/api";

type State = {
  token: string;
  setToken: (newToken: string) => void;
};

const loginSchem = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const useStore = create<State>((set) => ({
  token: "",
  setToken: (newToken: string) => set({ token: newToken }),
}));

type FormData = z.infer<typeof loginSchem>;

export default function index() {
  const navigate = useNavigate();

  const setToken = useStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: async (data) => {
      try {
        const result = await loginSchem.parse(data);
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

  const onSubmit = async (data: FormData) => {
    // const token = await loginUser(data.email, data.password);
    // console.log(token);

    navigate("/dashboard");
  };

  return (
    <div className="mx-auto w-screen h-screen flex-col flex items-center justify-center">
      <img src={logo} alt="Logo" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-11 min-h-60 w-80"
      >
        <div className="flex flex-col gap-3 mb-4">
          <div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
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

          <Button
            variant="link"
            className="hover:border-b-4 transition-transform h-6 cursor-pointer w-44"
          >
            Ainda não tem cadastro?
          </Button>
        </div>

        <Button className="h-11" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
