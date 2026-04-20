import Link from "next/link";
import Menu from "./components/Menu";

export default function Home() {
  return (
    <div>
      <Menu />
      Bem vindo a Celke! <br />
      <Link href="/users/list">Usuários</Link>
    </div>
  );
}
