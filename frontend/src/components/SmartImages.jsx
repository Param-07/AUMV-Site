import React, { useState } from "react";

const buildOptimizedUrl = (src, width, quality = 80, format = "webp") => {
  if (!src) return "";

  try {
    const url = new URL(src);

    if (width) url.searchParams.set("width", String(width));
    url.searchParams.set("quality", String(quality));
    url.searchParams.set("format", format);

    return url.toString();
  } catch {
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
  objectFit = "cover", // cover | contain
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div
        className={`w-full h-full bg-gray-200 animate-pulse rounded-md ${wrapperClassName}`}
      />
    );
  }

  const optimizedSrc = buildOptimizedUrl(src, width);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${wrapperClassName}`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-all duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${
          objectFit === "contain" ? "object-contain" : "object-cover"
        } ${className}`}
      />
    </div>
  );
}