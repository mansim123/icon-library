import Nav from "@/sections/nav";
import Search from "@/sections/search";
import Icons from "@/sections/icons";
import Footer from "@/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <div className="bg-[#596DED] w-full h-[5px] absolute top-0 z-[2]"></div>
      <Nav />
      <Search />
      <Icons />
      <Footer />
    </main>
  );
}
