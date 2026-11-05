/**
 * Direcciones de la web que se arman con datos. Sin importar los datos, así
 * se pueden usar también en el navegador (el buscador, el presupuesto).
 */
export const urlCatalogo = (catalogo: string) => `/catalogos/${catalogo}`;
export const urlProducto = (p: { catalogo: string; slug: string }) => `/catalogos/${p.catalogo}/${p.slug}`;
