/**
 * SEO Component using React 19 Native Document Metadata
 * 
 * React 19 automatically hoists <title>, <meta>, and <link> tags to document head
 * No external libraries needed!
 */

export default function SEO({
    title = "ChallengerDaily - Build Consistency One Day at a Time",
    description = "Simple challenge tracker to build lasting habits. Track your daily progress, visualize growth, and achieve your goals with ChallengerDaily.",
    keywords = "habit tracker, challenge tracker, daily habits, goal tracking, productivity, consistency, personal growth",
    ogImage = "/og-image.png",
    ogType = "website",
    canonicalUrl
}) {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const canonical = canonicalUrl || currentUrl;

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />
            <meta property="og:site_name" content="ChallengerDaily" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
        </>
    );
}
