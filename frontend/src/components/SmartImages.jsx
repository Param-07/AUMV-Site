import React, { useState } from "react";

const buildOptimizedUrl = (src, width, quality = 80, format = "webp") => {
  if (!src) return "";

  try {
    const url = new URL(src);

    // These params are compatible with many CDNs & Supabase image transforms.
    // If your project later uses /render/image/ paths, this still works.
    if (width) url.searchParams.set("width", String(width));
    url.searchParams.set("quality", String(quality));
    url.searchParams.set("format", format);

    return url.toString();
  } catch {
    // If src is relative or invalid URL, just return as-is
    return src;
  }
};

export default function SmartImage({
  src,
  alt = "",
  width,
  className = "",
  wrapperClassName = "",
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div
        className={
          "bg-gray-200 animate-pulse rounded-md " +
          (wrapperClassName || "w-full h-40")
        }
      />
    );
  }

  const optimizedSrc = buildOptimizedUrl(src, width);

  return (
    <div
      className={
        "relative overflow-hidden " +
        (wrapperClassName || "")
      }
    >
      {/* Skeleton / shimmer overlay */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={
          "block w-full h-auto transition-opacity duration-700 " +
          (loaded ? "opacity-100" : "opacity-0") +
          (className ? " " + className : "")
        }
      />
    </div>
  );
}
