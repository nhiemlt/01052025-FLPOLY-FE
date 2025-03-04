import { useState } from "react";
export default function Stepper() {
  // State để theo dõi các phần tử đã được click
  const [expandedStep, setExpandedStep] = useState(null);
  const [steps, setSteps] = useState([]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        label: "Chờ xác Nhận",
        description: "Người thay đổi cao đước anh huhgohighihhih",
      },
    ]);
  };
  return (
    <div className="flex flex-col px-6 pt-6  h-[300px] overflow-x-auto mb-4 ">
      <div className="flex justify-center items-center w-full relative">
        <div className="relative flex flex-col items-center ">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full 
            text-white transition-all duration-300 transform scale-125 shadow-xl bg-red-600"
            onClick={addStep} // Khi click sẽ thêm một phần tử
          >
            <span>ICON</span>
          </div>
          <div className="absolute top-[71px] bg-orange-400 h-[50px] w-[3px]"></div>
          <div className="absolute top-[121px] bg-orange-400 h-[17px] w-[160px] rounded-lg">
            <div>
              <div className="text-center">
                <p className="mt-6 font-bold">Chờ xác Nhận</p>
              </div>
              <p className="">Người thay đổi cao đước anh huhgohighihhih</p>
            </div>
          </div>
          <div className="absolute top-[122px] bg-white h-[15px] w-[15px] rounded-full"></div>
        </div>

        {/* Render thêm các phần tử mới khi click */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center ml-[100px]"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full text-white transition-all duration-300 transform scale-125 shadow-xl bg-red-400">
              <span>ICON</span>
            </div>
            <div className="absolute top-[71px] bg-blue-400 h-[50px] w-[3px]"></div>
            <div className="absolute top-[121px] bg-blue-400 h-[17px] w-[160px] rounded-lg">
              <div>
                <div className="text-center">
                  <p className="mt-6 font-bold">{step.label}</p>
                </div>
                <p>{step.description}</p>
              </div>
            </div>
            <div className="absolute top-[122px] bg-white h-[15px] w-[15px] rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
