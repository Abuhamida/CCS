"use client";
// pages/index.tsx
import React, { useState } from "react";
import {
  calculatePosteriorMultipleEvidences,
  calculatePosteriorSingleEvidence,
  Probabilities,
} from "./probability";

// Import necessary libraries and components

const Home: React.FC = () => {
  const [num_H, setNum_H] = useState<number | undefined>(3);
  const [num_E, setNum_E] = useState<number | undefined>(3);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState<string>();

  const [probabilities, setProbabilities] = useState<Probabilities>({
    hypotheses: { h1: 0.4, h2: 0.35, h3: 0.25 },
    evidence: {
      e1: { h1: 0.3, h2: 0.8, h3: 0.5 },
      e2: { h1: 0.9, h2: 0.0, h3: 0.7 },
      e3: { h1: 0.6, h2: 0.7, h3: 0.9 },
    },
  });

  const [selectedEvidences, setSelectedEvidences] = useState<string[]>([]);
  const [selectedHypotheses, setSelectedHypotheses] = useState<string[]>([]);

  const [calculationType, setCalculationType] = useState<string | undefined>(
    undefined
  );

  const handleNumOf_H = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNum_H(value);

    setProbabilities((prevProbabilities) => {
      const newProbabilities = { ...prevProbabilities };

      for (
        let i = Object.keys(prevProbabilities.hypotheses).length + 1;
        i <= value;
        i++
      ) {
        const hypothesisLabel = `h${i}`;

        // Ensure the hypothesis is initialized with a default value
        newProbabilities.hypotheses[hypothesisLabel] = 0;

        for (const evidenceLabel in newProbabilities.evidence) {
          // Ensure the evidence for the new hypothesis is initialized with a default value
          newProbabilities.evidence[evidenceLabel][hypothesisLabel] = 0;
        }
      }

      return newProbabilities;
    });
  };

  const handleNumOf_E = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNum_E(value);
  };

  const handleCalculationTypeChange = (type: string) => {
    setCalculationType(type);
  };

  const handleSelectionChange = (
    type: string,
    label: string,
    isChecked: boolean
  ) => {
    if (type === "evidence") {
      setSelectedEvidences((prevSelectedEvidences) => {
        if (isChecked) {
          return [...prevSelectedEvidences, label];
        } else {
          return prevSelectedEvidences.filter((item) => item !== label);
        }
      });
    } else if (type === "hypothesis") {
      setSelectedHypotheses((prevSelectedHypotheses) => {
        if (isChecked) {
          return [...prevSelectedHypotheses, label];
        } else {
          return prevSelectedHypotheses.filter((item) => item !== label);
        }
      });
    }
  };

  const handleProbabilityChange = (
    evidence: string,
    hypothesis: string,
    value: number
  ) => {
    setProbabilities((prevProbabilities) => {
      const updatedProbabilities = {
        ...prevProbabilities,
        evidence: {
          ...prevProbabilities.evidence,
          [evidence]: {
            ...prevProbabilities.evidence[evidence],
            [hypothesis]: value,
          },
        },
      };

      return updatedProbabilities;
    });
  };
  const handlePriorProbabilityChange = (hypothesis: string, value: number) => {
    setProbabilities((prevProbabilities) => {
      const updatedProbabilities = {
        ...prevProbabilities,
        hypotheses: {
          ...prevProbabilities.hypotheses,
          [hypothesis]: value,
        },
      };

      return updatedProbabilities;
    });
  };

  const renderProbabilityInputs = () => {
    if (num_H === undefined || num_E === undefined) {
      return null;
    }

    const rows = [];

    for (let j = 0; j < num_E; j++) {
      const evidenceLabel = `e${j + 1}`;
      const cells = [];

      for (let i = 0; i < num_H; i++) {
        const hypothesisLabel = `h${i + 1}`;
        const probabilityValue =
          probabilities.evidence[evidenceLabel]?.[hypothesisLabel] || 0;

        cells.push(
          <td key={`${hypothesisLabel}-${evidenceLabel}`}>
            <div className="flex flex-col gap-2">
              <label className="label-text ">
                Probability for{" "}
                <span className=" uppercase">{`${hypothesisLabel}|${evidenceLabel}:`}</span>{" "}
              </label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                type="number"
                title={`probability_${hypothesisLabel}_${evidenceLabel}`}
                value={probabilityValue}
                onChange={(e) =>
                  handleProbabilityChange(
                    evidenceLabel,
                    hypothesisLabel,
                    parseFloat(e.target.value)
                  )
                }
              />
            </div>
          </td>
        );
      }

      rows.push(
        <tr key={`row-${evidenceLabel}`}>
          <th>
            <label className="cursor-pointer label uppercase flex items-center">
              <input
                className="checkbox checkbox-info"
                type="checkbox"
                value={evidenceLabel}
                checked={selectedEvidences.includes(evidenceLabel)}
                onChange={() =>
                  handleSelectionChange(
                    "evidence",
                    evidenceLabel,
                    !selectedEvidences.includes(evidenceLabel)
                  )
                }
              />
              <span className="label-text">{evidenceLabel}</span> 
            </label>
          </th>
          {cells}
        </tr>
      );
    }

    return (
      <table className="">
        <thead>
          <tr>
            <th></th>
            {[...Array(num_H)].map((_, i) => (
              <th key={`header-H${i + 1}`} className="">
                <label className="cursor-pointer label uppercase">
                  <input
                    className="checkbox checkbox-info"
                    type="checkbox"
                    value={`h${i + 1}`}
                    checked={selectedHypotheses.includes(`h${i + 1}`)}
                    onChange={() =>
                      handleSelectionChange(
                        "hypothesis",
                        `h${i + 1}`,
                        !selectedHypotheses.includes(`h${i + 1}`)
                      )
                    }
                  />
                  <span className="label-text">{`h${i + 1}`}</span> 
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const renderPriorProbabilityInputs = () => {
    if (num_H === undefined) {
      return null;
    }

    const inputs = [];

    for (let i = 1; i <= num_H; i++) {
      const hypothesisLabel = `h${i}`;
      const probabilityValue = probabilities.hypotheses[hypothesisLabel] || 0;

      inputs.push(
        <div key={hypothesisLabel} className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label className="label-text">{`Prior Probability for ${hypothesisLabel}:`}</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="number"
              title={`prior_probability_${hypothesisLabel}`}
              value={probabilityValue}
              onChange={(e) =>
                handlePriorProbabilityChange(
                  hypothesisLabel,
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
        </div>
      );
    }

    return inputs;
  };

  const calculatePosterior = () => {
    if (
      calculationType === "single" &&
      selectedEvidences.length === 1 &&
      num_H
    ) {
      const posteriorSingleEvidence = calculatePosteriorSingleEvidence(
        probabilities,
        selectedHypotheses,
        selectedEvidences[0]
      );
      console.log(selectedHypotheses);
      const results = [];
      for (let i = 0; i < selectedHypotheses.length; i++) {
        const roundedResult = posteriorSingleEvidence[i].toFixed(3);
        const r = `${selectedHypotheses[i]} | ${selectedEvidences.join(
          " "
        )} = ${roundedResult}`;
        console.log(selectedHypotheses[i]);
        // Your code using 'r' inside the loop
        results.push(r);
      }
      setResult(results);
      setError("");
    } else if (
      calculationType === "multiple" &&
      selectedEvidences.length > 1 &&
      num_H
    ) {
      const posteriorMultipleEvidences = calculatePosteriorMultipleEvidences(
        probabilities,
        selectedHypotheses,
        selectedEvidences
      );
      const results = [];

      for (let i = 0; i < selectedHypotheses.length; i++) {
        const roundedResult = posteriorMultipleEvidences[i].toFixed(3);
        const r = `${selectedHypotheses[i]} | ${selectedEvidences.join(
          " "
        )} = ${roundedResult}`;
        // Your code using 'r' inside the loop
        results.push(r);
      }
      setResult(results);
      setError("");
    } else {
      setError(
        "Invalid selection , please select if it single or multi evidence "
      );
    }
  };

  return (
    <div className="pt-24 flex flex-col gap-5 items-center min-h-screen">
      <h1 className="text-3xl font-bold text-[#000066] ">
        Bayesian Probability Calculations
      </h1>
      <div className="flex gap-5">
        <div className="flex flex-col">
          <label className="label-text">Number of Hypotheses:</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            value={num_H}
            onChange={handleNumOf_H}
            title="number"
          />
        </div>
        <div className="flex flex-col">
          <label className="label-text">Number of Evidence:</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            value={num_E}
            onChange={handleNumOf_E}
            title="number"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center text-2xl items-center gap-2">
        <label className="label-text">Calculation Type:</label>
        <div className="flex gap-5 text-[#000066] font-semibold">
          <label>
            <input
              type="radio"
              value="single"
              checked={calculationType === "single"}
              onChange={() => handleCalculationTypeChange("single")}
            />
            Single Evidence
          </label>
          <label>
            <input
              type="radio"
              value="multiple"
              checked={calculationType === "multiple"}
              onChange={() => handleCalculationTypeChange("multiple")}
            />
            Multiple Evidences
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        {renderPriorProbabilityInputs()}
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        {renderProbabilityInputs()}
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-outline btn-info"
          onClick={calculatePosterior}
          disabled={
            !num_H ||
            !num_E ||
            !calculationType ||
            selectedEvidences.length === 0 ||
            selectedHypotheses.length == 0 ||
            (calculationType === "single" && selectedEvidences.length !== 1) ||
            (calculationType === "multiple" && selectedEvidences.length == 1)
          }
        >
          Calculate Posterior
        </button>
      </div>

      <div className="mt-5 flex flex-col lg:flex-row gap-5">
        {error ? (
          <div role="alert" className="alert alert-error">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        ) : (
          result.map((value, index) => (
            <div
              key={index}
              role="alert"
              className="alert alert-info flex  items-center justify-center w-72"
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

              <span className=" uppercase">
                {result && result[index] !== undefined && `${value} `}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
