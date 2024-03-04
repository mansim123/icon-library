import Nav from "@/sections/nav";
import Search from "@/sections/search";
import Icons from "@/sections/icons";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <Nav />
      <Search />
      <Icons />
    </main>
  );
}
