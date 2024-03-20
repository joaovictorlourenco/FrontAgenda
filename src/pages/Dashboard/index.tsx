import Header from "@/components/Header";
import userStore from "@/store/userStore";

export default function index() {
  return (
    <>
      <Header />
      <div className="flex content-center items-center m-3">
        <div>
          <h2 className="text-zinc-700 ml-5 text-2xl">
            Seja Bem Vindo, {userStore.getState().name}!
          </h2>
        </div>
      </div>
    </>
  );
}
