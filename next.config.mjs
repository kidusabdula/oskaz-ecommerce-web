import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  // Explicitly set Turbopack root to this project to avoid
  // incorrect workspace inference when multiple lockfiles exist.
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig