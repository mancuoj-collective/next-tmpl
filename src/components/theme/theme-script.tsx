export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
      }}
    />
  )
}
