import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'plugin/index': 'src/plugin/index.ts',
    'components/index': 'src/components/index.ts',
    'hooks/index': 'src/hooks/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // Using manual type declarations
  splitting: false,
  sourcemap: true,
  clean: false, // Don't clean to preserve manual .d.ts files
  external: [
    'react',
    'react-dom',
    'next',
    'next/link',
    'next/navigation',
    'payload',
    '@payloadcms/ui',
    '@payloadcms/ui/elements/RenderServerComponent',
    '@payloadcms/ui/shared',
    '@payloadcms/translations',
    'lucide-react',
  ],
  // Ignore SCSS files - they should be imported separately by the app
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.scss': 'empty',
    }
  },
})
