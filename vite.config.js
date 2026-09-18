import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { syncResumeHtml } from './scripts/sync-resume.mjs'

function resumeSyncPlugin() {
  return {
    name: 'resume-sync-plugin',
    buildStart() {
      try {
        syncResumeHtml()
      } catch (e) {
        console.error('[resume-sync] buildStart error:', e.message)
      }
    },
    handleHotUpdate({ file, server }) {
      if (
        file.includes('src/constants/projects.js') ||
        file.includes('src/constants/projectDetails.js')
      ) {
        try {
          syncResumeHtml()
          server.ws.send({ type: 'full-reload' })
        } catch (e) {
          console.error('[resume-sync] Hot update error:', e.message)
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), resumeSyncPlugin()],
  base: '/',
})

