import type { Application } from "../types/application";

type Props = {
  app: Application;
  onClick: (app: Application) => void;
};

export default function Card({ app, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(app)}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 
                 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <h3 className="font-semibold text-gray-800 text-sm">
        {app.company}
      </h3>

      <p className="text-xs text-gray-500 mt-1">{app.role}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-[10px] text-gray-400">
          {app.dateApplied}
        </span>

        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
          {app.status}
        </span>
      </div>
    </div>
  );
}