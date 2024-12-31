import { baseColors } from './base'

export function ThemeStyle() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0);var c=JSON.parse(localStorage.getItem("use-config")||'{"color": "zinc", "radius": "0.5")}');document.documentElement.classList.add("theme-" + c.color);document.documentElement.style.setProperty("--radius", c.radius + "rem");}();`,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
    </>
  )
}

function generateCSS() {
  return baseColors.map(color => `
.theme-${color.name} {
  ${Object.entries(color.cssVars.light)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ')}
}
.dark.theme-${color.name} {
  ${Object.entries(color.cssVars.dark)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ')}
}`).join('\n')
}
