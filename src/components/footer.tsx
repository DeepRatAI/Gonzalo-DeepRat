export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold tracking-wide text-foreground">
            GONZALO ROMERO
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            AI Engineer · DeepRat
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Gonzalo Romero. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
