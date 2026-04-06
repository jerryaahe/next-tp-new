import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Uncomment to block search engines from indexing specific paths
      // disallow: ["/admin", "/dashboard", "/private"],
    },
  };
}
