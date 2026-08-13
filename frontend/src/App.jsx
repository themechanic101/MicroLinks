import { useState } from "react";

function App() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [stats, setStats] = useState(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleShorten = async () => {
        if (!url.trim()) {
            setError("Please enter a URL");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shorten`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    originalUrl: url,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setShortUrl(data.shortUrl);

            // Get short code from returned URL
            const shortCode = data.shortUrl.split("/").pop();

            const statsResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/stats/${shortCode}`
          );

            const statsData = await statsResponse.json();

            if (statsResponse.ok) {
                setStats(statsData);
            }

        } catch (error) {
            setError("Unable to connect to the server");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Navbar */}
            <header className="border-b border-gray-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                    <div className="flex items-center gap-3">
                        <span className="text-3xl text-blue-600">
                            🔗
                        </span>

                        <h1 className="text-2xl font-bold">
                            MicroLinks
                        </h1>
                    </div>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 transition hover:text-white"
                    >
                        GitHub
                    </a>

                </div>
            </header>


            {/* Main */}
            <main className="mx-auto max-w-6xl px-6 py-20">

                {/* Hero Card */}
                <section className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-16 text-center">

                    <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
                        Shorten your links.
                    </h2>

                    <p className="mt-5 text-lg text-gray-400">
                        Create short, shareable URLs in seconds.
                    </p>


                    {/* Input */}
                    <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 sm:flex-row">

                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleShorten();
                                }
                            }}
                            placeholder="Paste your long URL here..."
                            className="flex-1 rounded-lg border border-gray-800 bg-gray-800 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-blue-600"
                        />

                        <button
                            onClick={handleShorten}
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Shortening..." : "Shorten URL"}
                        </button>

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="mt-4 text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    {/* Features */}
                    <div className="mt-8 flex justify-center gap-6 text-sm text-gray-400">
                        <span>⚡ Fast</span>
                        <span>•</span>
                        <span>🛡 Secure</span>
                        <span>•</span>
                        <span>🌐 Reliable</span>
                    </div>

                </section>


                {/* Result Card */}
                {shortUrl && (
                    <section className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6">

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                                ✓
                            </div>

                            <h3 className="text-xl font-semibold">
                                Your shortened URL
                            </h3>
                        </div>


                        {/* Short URL */}
                        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-950 p-5 sm:flex-row sm:items-center sm:justify-between">

                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="break-all text-lg font-medium text-blue-500 hover:text-blue-400"
                            >
                                {shortUrl}
                            </a>

                            <button
                                onClick={handleCopy}
                                className="shrink-0 rounded-lg border border-gray-800 px-5 py-2.5 font-medium transition hover:bg-gray-800"
                            >
                                {copied ? "✓ Copied" : "Copy"}
                            </button>

                        </div>


                        {/* Statistics */}
                        {stats && (
                            <div className="mt-8 border-t border-gray-800 pt-8">

                                <h3 className="text-xl font-semibold">
                                    Statistics
                                </h3>

                                <div className="mt-6 grid gap-4 md:grid-cols-3">

                                    {/* Clicks */}
                                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-5">
                                        <p className="text-sm text-gray-400">
                                            Total Clicks
                                        </p>

                                        <p className="mt-2 text-3xl font-bold">
                                            {stats.clicks}
                                        </p>
                                    </div>


                                    {/* Created */}
                                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-5">
                                        <p className="text-sm text-gray-400">
                                            Created At
                                        </p>

                                        <p className="mt-2 text-lg font-semibold">
                                            {new Date(
                                                stats.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>


                                    {/* Original */}
                                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-5">
                                        <p className="text-sm text-gray-400">
                                            Original URL
                                        </p>

                                        <p className="mt-2 truncate text-blue-500">
                                            {stats.originalUrl}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        )}

                    </section>
                )}

            </main>


           
        </div>
    );
}

export default App;