/** Pakistani mobile: 03XXXXXXXXX, optionally written with +92 / 92 / 0092, spaces or dashes. */
export function isPkMobile(raw: string) {
  return /^(?:\+92|0092|92|0)3\d{9}$/.test(raw.replace(/[\s-]/g, ""));
}
