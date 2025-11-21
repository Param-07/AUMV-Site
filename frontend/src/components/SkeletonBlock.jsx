export default function SkeletonBlock({ height = "h-40", width = "w-full", rounded = "rounded-xl" }) {
    return (
      <div
        className={`${height} ${width} ${rounded} bg-gray-300 dark:bg-gray-700 animate-pulse`}
      ></div>
    );
  }
  