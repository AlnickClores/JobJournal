import { JSX } from "react";

export const getProgressBadge = (progress: string): JSX.Element => {
  const progressColors = {
    applied: "bg-blue-100 text-blue-800",
    "phone-screen": "bg-yellow-100 text-yellow-800",
    interview: "bg-purple-100 text-purple-800",
    "final-round": "bg-orange-100 text-orange-800",
    offer: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    withdrawn: "bg-gray-100 text-gray-800",
  };

  const style =
    progressColors[progress as keyof typeof progressColors] ||
    "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}
    >
      {progress.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  );
};
