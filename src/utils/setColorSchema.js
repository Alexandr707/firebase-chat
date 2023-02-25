export function setColorSchema(schema, writeLS = true) {
  if (typeof schema !== "object")
    throw new Error("Color schema is not correct");

  writeLS && window.localStorage.setItem("colorSchema", JSON.stringify(schema));

  Object.keys(schema).map((k) => {
    document.documentElement.style.setProperty(`--${k}`, schema[k]);
  });
}
