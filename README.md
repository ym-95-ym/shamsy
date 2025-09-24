
This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


add in vite: 
export default defineConfig(({ mode }) => ({
    base: '/shamsy/', // <-- Korrekt hier!

add in App: BrowserRouter basename="/shamsy"  {/* ← DIESE ZEILE HINZUGEFÜGT */}


maybe in index.html:     <!-- GitHub Pages SPA fix -->
    <script type="text/javascript">
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
