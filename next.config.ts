import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Existe um pnpm-lock.yaml na pasta do usuario, fora deste repositorio.
  // Sem fixar a raiz, o Turbopack sobe procurando lockfile e avisa a cada build.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
