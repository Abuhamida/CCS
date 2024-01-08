"use client";
import { useState } from "react";

const GCM: React.FC = () => {
  const [n_data, set_n_data] = useState(3); // Set the initial number of data points
  const [n_features, set_N_featurs] = useState(3);
  const [observation, setObservation] = useState<number[]>(
    Array.from({ length: 3 }, (_, i) => 2)
  );
  const [message, setMessage] = useState("");
  const c: number = 0.5;
  const [classAInput, setClassAInput] = useState<string[]>([
    "2,5,1",
    "3,6,2",
    "1,5,2",
  ]);
  const [classBInput, setClassBInput] = useState<string[]>([
    "4,1,1",
    "3,2,2",
    "5,1,3",
  ]);

  const dataA: number[][] = classAInput.map((point) =>
    point.split(",").map((num) => parseFloat(num) || 0)
  );
  const dataB: number[][] = classBInput.map((point) =>
    point.split(",").map((num) => parseFloat(num) || 0)
  );

  const calculateSimilarity = (classData: number[][]): number => {
    let similarity = 0;

    for (const dataPoint of classData) {
      const distance = Math.sqrt(
        dataPoint.reduce(
          (acc, val, index) => acc + (val - observation[index]) ** 2,
          0
        )
      );
      similarity += Math.exp(-c * distance);
    }

    return similarity;
  };

  const handleObservationChange = (index: number, value: string) => {
    const updatedObservation = [...observation];
    updatedObservation[index] = parseFloat(value) || 0;
    setObservation(updatedObservation);
  };
  const handleN_features = (e: any) => {
    const value = parseInt(e.target.value, 10) || 0;
    set_N_featurs(value);
    setObservation(Array.from({ length: value }, (_, i) => 0));
  };
  const handleN_data = (e: any) => {
    const value = parseInt(e.target.value, 10) || 0;
    set_n_data(value);
    setClassAInput(Array.from({ length: value }, () => ""));
    setClassBInput(Array.from({ length: value }, () => ""));
  };

  const handleClassInputChange = (
    index: number,
    value: string,
    classType: string
  ) => {
    if (classType === "A") {
      const updatedClassAInput = [...classAInput];
      updatedClassAInput[index] = value;
      setClassAInput(updatedClassAInput);
    } else if (classType === "B") {
      const updatedClassBInput = [...classBInput];
      updatedClassBInput[index] = value;
      setClassBInput(updatedClassBInput);
    }
  };

  const handleClassify = () => {
    const similarityA: number = calculateSimilarity(dataA);
    const similarityB: number = calculateSimilarity(dataB);

    const totalSimilarityA: number = similarityA;
    const totalSimilarityB: number = similarityB;

    const probability: number =
      totalSimilarityA / (totalSimilarityA + totalSimilarityB);

    if (probability > 0.5) {
      setMessage(
        "Observation belongs to Class A, with probability: " + probability
      );
    } else {
      setMessage(
        "Observation belongs to Class B, with probability: " + (1 - probability)
      );
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 items-center pt-24">
      <h1 className="text-3xl font-bold text-[#000066] ">GCM Classifier</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className=" flex flex-col ">
          <label className="label-text ">Number of data points:</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            value={n_data}
            onChange={handleN_data}
            title="number"
          />
        </div>
        <div className=" flex flex-col ">
          <label className="label-text ">Number of features</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            value={n_features}
            onChange={handleN_features}
            title="number"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {observation.map((value, index) => (
          <div key={index}>
            <label className="label-text">{`Feature ${index + 1}:`}</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="number"
              title="data1"
              value={value}
              onChange={(e) => handleObservationChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-5 items-center pt-5 text-2xl font-semibold">
          <h3>Enter data for Class A:</h3>
          {classAInput.map((value, index) => (
            <div key={index}>
              <label className="label-text">{`Feature ${index + 1}:`}</label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                type="text"
                title="dataA"
                value={value}
                onChange={(e) =>
                  handleClassInputChange(index, e.target.value, "A")
                }
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 items-center pt-5 text-2xl font-semibold">
          <h3>Enter data for Class B:</h3>
          {classBInput.map((value, index) => (
            <div key={index}>
              <label className="label-text">{`Feature ${index + 1}:`}</label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                type="text"
                title="dataB "
                value={value}
                onChange={(e) =>
                  handleClassInputChange(index, e.target.value, "B")
                }
              />
            </div>
          ))}
        </div>
      </div>
      {message && (
        <div role="alert" className="alert alert-info text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">{message}</span>
        </div>
      )}
      <button className="btn btn-outline btn-info" onClick={handleClassify}>
        Classify
      </button>
    </div>
  );
};

export default GCM;
