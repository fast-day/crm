export const isRouteActive = (pathname: string, to: string, paths: string[]) => {
  const matches = paths.filter(p => pathname === p || pathname.startsWith(`${p}/`));
  if (!matches.length) return false;
  const best = matches.reduce((a, b) => (b.length > a.length ? b : a));
  return best === to;
};
