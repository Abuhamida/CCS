"use client";
import React, { useState, ChangeEvent } from "react";
import Classifier from "./nav";

interface Sample {
  decision: string;
  features: Record<string, string>;
}

const defaultTrainingData: Sample[] = [
  { decision: "go-out", features: { feature1: "sunny", feature2: "working" } },
  { decision: "go-out", features: { feature1: "rainy", feature2: "broken" } },
  { decision: "go-out", features: { feature1: "sunny", feature2: "working" } },
  { decision: "go-out", features: { feature1: "sunny", feature2: "working" } },
  { decision: "go-out", features: { feature1: "sunny", feature2: "working" } },
  {
    decision: "stay-home",
    features: { feature1: "rainy", feature2: "broken" },
  },
  {
    decision: "stay-home",
    features: { feature1: "rainy", feature2: "broken" },
  },
  {
    decision: "stay-home",
    features: { feature1: "sunny", feature2: "working" },
  },
  {
    decision: "stay-home",
    features: { feature1: "sunny", feature2: "broken" },
  },
  {
    decision: "stay-home",
    features: { feature1: "rainy", feature2: "broken" },
  },
];

const defaultTestData: Record<string, string> = {
  feature1: "sunny",
  feature2: "working",
};

const Navbays: React.FC = () => {
  const [numFeatures, setNumFeatures] = useState<number>(2);
  const [numSamples, setNumSamples] = useState<number>(
    defaultTrainingData.length
  );
  const [trainingData, setTrainingData] =
    useState<Sample[]>(defaultTrainingData);
  const [testData, setTestData] =
    useState<Record<string, string>>(defaultTestData);

  const [predict, setPredict] = useState<string | undefined>(undefined);
  const [predict_probability, setProbability] = useState<string | undefined>(
    undefined
  );

  const weatherCarClassifier = new Classifier();

  const handleNumFeaturesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNumFeatures = parseInt(e.target.value, 10);
    setNumFeatures(newNumFeatures);
  };

  const handleNumSamplesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNumSamples = parseInt(e.target.value, 10);
  
    setNumSamples(newNumSamples);
  
    setTrainingData((prevData) => {
      const newData = [...prevData];
      const diff = newNumSamples - prevData.length;
  
      if (diff > 0) {
        // Add new samples
        for (let i = 0; i < diff; i++) {
          newData.push({ decision: "", features: {} });
        }
      } else if (diff < 0) {
        // Remove samples
        newData.splice(diff);
      }
  
      return newData;
    });
  };
  

  const handleTrainingDataChange = (
    sampleIndex: number,
    field: string,
    value: string
  ) => {
    setTrainingData((prevData) => {
      const newData = [...prevData];
      const currentSample = { ...newData[sampleIndex] };
  
      if (field === 'decision') {
        currentSample.decision = value;
      } else if (field.startsWith('feature')) {
        currentSample.features = {
          ...currentSample.features,
          [field]: value,
        };
      }
  
      newData[sampleIndex] = currentSample;
      console.log(newData);
      return newData;
    });
  };
  
  
  const handleTestDataChange = (field: string, value: string) => {
    setTestData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const renderTrainingDataInputs = () => {
    const inputs = [];

    for (let i = 0; i < numSamples; i++) {
      const sampleInputs = (
        <div key={i}>
          <h4>Sample {i + 1}:</h4>
          <div className="flex justify-center items-center ">
            <label
              className="label label-text"
              htmlFor={`sample-${i + 1}-decision`}
            >
              Decision:
            </label>
            <input
              className="input input-bordered input-info w-full "
              type="text"
              id={`sample-${i + 1}-decision`}
              value={trainingData[i]?.decision || ""}
              onChange={(e) =>
                handleTrainingDataChange(i, "decision", e.target.value)
              }
            />
          </div>

          <h5>Features:</h5>
          {Array.from({ length: numFeatures }, (_, j) => j + 1).map(
            (featureNum) => {
              const featureName = `feature${featureNum}`;
              const featureValue =
                trainingData[i]?.features?.[featureName] || "";

              return (
                <div
                  key={featureName}
                  className="flex justify-center items-center"
                >
                  <label
                    className="label label-text"
                    htmlFor={`sample-${i + 1}-${featureName}`}
                  >
                    {`${featureName}:`}
                  </label>
                  <input
                    className="input mt-2 input-bordered input-info w-full max-w-xs"
                    type="text"
                    id={`sample-${i + 1}-${featureName}`}
                    value={featureValue}
                    onChange={(e) =>
                      handleTrainingDataChange(i, featureName, e.target.value)
                    }
                  />
                </div>
              );
            }
          )}
        </div>
      );
      inputs.push(sampleInputs);
    }

    return inputs;
  };
  const renderTestDataInputs = () => {
    return (
      <div>
        <h3>Enter Test Data:</h3>
        {numFeatures > 0 && (
          <div>
            {Array.from({ length: numFeatures }, (_, j) => j + 1).map(
              (featureNum) => {
                const featureName = `feature${featureNum}`;
                return (
                  <div
                    key={featureName}
                    className="flex justify-center items-center"
                  >
                    <label
                      className="label label-text"
                      htmlFor={`test-${featureName}`}
                    >
                      {`${featureName}:`}
                    </label>
                    <input
                      className="input mt-2 input-bordered input-info w-full max-w-xs"
                      type="text"
                      id={`test-${featureName}`}
                      value={testData[featureName] || ""}
                      onChange={(e) =>
                        handleTestDataChange(featureName, e.target.value)
                      }
                    />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    );
  };

  const classify = () => {
    weatherCarClassifier.train(trainingData);
    const predictionResult = weatherCarClassifier.predict(testData);

    setPredict(predictionResult.predictedDecision || "");
    const probabilityString = Object.entries(predictionResult.probabilities)
      .map(
        ([className, probability]) => `${className}: ${probability.toFixed(4)}`
      )
      .join(", ");

    setProbability(probabilityString || "");

    console.log("Predicted decision:", predict);
    console.log("Probabilities:", predict_probability);
  };

  return (
    <div className="pt-24 flex flex-col gap-5 items-center  min-h-screen">
      <h1 className="text-3xl font-bold text-[#000066] ">Naive Bayes</h1>
      <div className="flex gap-5">
        <div className="flex flex-col justify-center items-center ">
          <label htmlFor="numFeatures" className=" label label-text">
            Number of Features:
          </label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            id="numFeatures"
            value={numFeatures}
            onChange={handleNumFeaturesChange}
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <label htmlFor="numSamples" className=" label label-text">
            Number of Training Data Samples:
          </label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            id="numSamples"
            value={numSamples}
            onChange={handleNumSamplesChange}
          />
        </div>
      </div>

      {/* Render input fields for training data based on the number of samples */}
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {renderTrainingDataInputs()}
      </div>
      <div className="flex  gap-3 items-center justify-center">
        {renderTestDataInputs()}
      </div>
      <h3>
        {predict && (
          <div role="alert" className="alert alert-info">
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
            <span>{predict}</span>
          </div>
        )}
      </h3>
      <div className="flex gap-5 items-center">
        {predict_probability?.split(",").map((value) => (
          <div
            key={value}
            role="alert"
            className="alert flex items-center justify-center w-72"
          >
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
            <span>{value}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-outline btn-info" onClick={classify}>
        Classify
      </button>
    </div>
  );
};

export default Navbays;
