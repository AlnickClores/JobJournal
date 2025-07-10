import { BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-purple-100 rounded-full mr-4">
          <BookOpen className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
          Job <span className="text-purple-600">Journal</span>
        </h1>
      </div>

      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Track your job applications, organize your career journey, and never
        miss an opportunity. Your personal companion for job hunting success.
      </p>
    </div>
  );
};

export default Hero;
