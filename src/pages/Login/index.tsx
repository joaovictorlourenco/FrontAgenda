import logo from "@/assets/logo.png";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    const token = await loginUser(data.email, data.password);
    console.log(token);
  };

  return (
    <div className="mx-auto w-80">
      <img src={logo} alt="Logo" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3.5 min-h-60"
      >
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input {...register("email")} placeholder="Email" />
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />

        <p className="group-hover:text-slate-500 cursor-pointer">
          Ainda não tem cadastro?
        </p>
        <Button className="" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
