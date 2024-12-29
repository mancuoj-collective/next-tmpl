'use client'

import { baseColors } from './base-colors'

export function ThemeScript() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(){
              var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0);
              var c=JSON.parse(localStorage.getItem("use-config")||'{"color": "zinc", "radius": "0.5")}');document.documentElement.classList.add("theme-" + c.color);document.documentElement.style.setProperty("--radius", c.radius + "rem");
            }();
          `,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: generateThemeCSS() }} />
    </>
  )
}

function generateThemeCSS() {
  return baseColors.map(theme => `
.theme-${theme.name} {
  ${Object.entries(theme.cssVars.light)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ')}
}
.dark.theme-${theme.name} {
  ${Object.entries(theme.cssVars.dark)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ')}
}`).join('\n')
}
