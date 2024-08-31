export const getParams = (header: Headers) => {
  const header_url = header.get("x-url") || "";
  const domain = header.get("host") || "";
  const [, pathname] =
    header_url.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];

  return pathname;
};
