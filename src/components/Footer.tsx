const Footer = () => {
  return (
    <footer className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <hr className="text-gray-500" />

        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-foreground">Sentinel.</span>

          <p className="text-sm text-muted-foreground">
            © 2025-present Parametric Insurance Built On Stellar Blockchain
          </p>

          <a
            href="https://x.com/Sentinel_Fi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Follow us on X (Twitter)"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
