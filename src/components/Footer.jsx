export default function Footer() {
  return (
    <footer className="bg-primary border-t border-slate-800 py-6 text-center text-textMuted text-sm">
      <p>
        Designed &amp; Built by{" "}
        <span className="text-accent font-medium">Your Name</span>
        {" "}· {new Date().getFullYear()}
      </p>
    </footer>
  )
}
