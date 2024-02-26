import { ModeToggle } from "@/components/ui/toggle-mode";

export default function Nav() {
  return (
    <section className="py-14 bg-secondary w-full">
      <div className="max-w-5xl sm:flex sm:flex-row items-center justify-between px-6 lg:px-0 m-auto">
        <div className="w-full sm:w-1/2">
          <a href="/" className="text-xl font-bold">
            INSERT NAME?
          </a>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
}
