import Header from "@/components/Header";
import tokenStore from "@/store/tokenStore";

export default function index() {
  const token = tokenStore((state) => state.token);

  return (
    <>
      <Header />
      <body className="flex content-center items-center m-3">
        <div>
          <h2 className="text-zinc-700 text-2xl">Seja Bem Vindo, Nome!!!</h2>
        </div>
      </body>
    </>
  );
}
