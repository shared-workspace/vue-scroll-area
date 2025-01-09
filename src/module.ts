import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'
import pkg from '../package.json'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-scroll-area',
    configKey: 'scrollArea',
    compatibility: {
      nuxt: '>=3.0.0',
    },
    version: pkg.version,
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.scrollArea = { ...options }
    // addComponent({ name: 'ScrollArea', filePath: resolver.resolve('./runtime/components/ScrollArea.vue') })
  },
})
