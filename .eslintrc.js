module.exports = {
  root: true,
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "next/core-web-vitals",
    "next/typescript",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
};
