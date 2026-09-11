import { cn } from "@/utils/cn";
import { FaCheck } from "react-icons/fa6";

const STEPS = [
  { step: 1, label: "Info Pemesan" },
  { step: 2, label: "Detail Pengambilan" },
  { step: 3, label: "Pembayaran" },
];

const Stepper = ({ current }: { current: number }) => {
  return (
    <div className="flex items-start">
      {STEPS.map((item, index) => {
        const isDone = current > item.step;
        const isActive = current === item.step;

        return (
          <div key={item.step} className="flex flex-1 items-start last:flex-none">
            <div className="grid w-20 justify-items-center gap-2">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition duration-200",
                  isDone || isActive
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {isDone ? <FaCheck size={16} /> : item.step}
              </span>
              <span
                className={cn(
                  "text-center text-xs font-semibold sm:text-sm",
                  isDone || isActive ? "text-primary" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <span
                className={cn(
                  "mt-5 h-1 flex-1 rounded-full transition duration-200",
                  isDone ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
