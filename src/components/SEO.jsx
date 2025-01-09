import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
	title,
	description,
	keywords = [],
	ogImage = "/og-image.jpg", // Update this path
	canonical,
}) => {
	const siteTitle = "Cropmail - Email Marketing Solution";
	const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.join(", ")} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={ogImage} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImage} />

			{/* Canonical URL */}
			{canonical && <link rel="canonical" href={canonical} />}

			{/* Additional SEO-friendly meta tags */}
			<meta name="robots" content="index, follow" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="theme-color" content="#3B82F6" />
		</Helmet>
	);
};

export default SEO;
