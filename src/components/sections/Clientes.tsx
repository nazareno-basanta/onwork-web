import Marquee from "@/components/ui/Marquee";
import { CLIENTES, CLIENTES_ROTULO, type Cliente } from "@/data/clientes";

function Logo({ cliente }: { cliente: Cliente }) {
  return (
    <li className="group flex h-20 min-w-44 shrink-0 items-center justify-center px-6">
      {cliente.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cliente.logo}
          alt={cliente.nombre}
          loading="lazy"
          className="h-10 w-auto max-w-40 object-contain opacity-80 brightness-0 transition duration-300 group-hover:opacity-100 group-hover:brightness-100"
        />
      ) : (
        <span className="font-display text-lg font-extrabold text-ow-black/40">
          [logo] {cliente.nombre}
        </span>
      )}
    </li>
  );
}

/**
 * Franja de logos en loop (Magic UI · Marquee). Los logos van en una sola
 * tinta y recuperan su color al pasar el mouse; se frena al pasar el mouse.
 * Dos filas en sentidos opuestos solo si hay más de 12 marcas.
 */
export default function Clientes() {
  const dosFilas = CLIENTES.length > 12;
  const mitad = Math.ceil(CLIENTES.length / 2);
  const filas = dosFilas ? [CLIENTES.slice(0, mitad), CLIENTES.slice(mitad)] : [CLIENTES];

  return (
    <section aria-label={CLIENTES_ROTULO} className="border-y border-ow-black/10 py-10 md:py-14">
      <p className="container-ow text-sm font-semibold text-ow-gray">{CLIENTES_ROTULO}</p>
      <div className="relative mt-6 space-y-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {filas.map((fila, i) => (
          <Marquee key={i} pauseOnHover reverse={i === 1} className="[--duration:45s] [--gap:0rem]">
            <ul className="flex">
              {fila.map((c) => (
                <Logo key={c.nombre} cliente={c} />
              ))}
            </ul>
          </Marquee>
        ))}
      </div>
    </section>
  );
}
