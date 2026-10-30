import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/lib/site";
import MobileNav from "./MobileNav";
import WhatsAppLink from "./WhatsAppLink";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ow-black/10 bg-white/85 backdrop-blur-md">
      <div className="container-ow flex h-16 items-center justify-between">
        <Link href="/" aria-label="On Work, ir al inicio" className="shrink-0">
          <Image
            src="/brand/logo-onwork.svg"
            alt="On Work, comunicación y merchandising"
            width={715}
            height={255}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-bold underline-offset-8 decoration-2 decoration-ow-yellow hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppLink tone="black" className="!px-5 !py-2.5">
            Escribinos
          </WhatsAppLink>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
