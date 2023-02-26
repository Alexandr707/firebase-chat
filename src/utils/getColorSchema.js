export function getColorSchema() {
  const schema = JSON.parse(window.localStorage.getItem("colorSchema"));
  if (schema) return schema;

  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--primaryColor")
    .trim();
  const secondaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--secondaryColor")
    .trim();
  const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--bgColor")
    .trim();
  const warningColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--warningColor")
    .trim();
  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--warningColor")
    .trim();

  return { primaryColor, secondaryColor, bgColor, warningColor, textColor };
}
