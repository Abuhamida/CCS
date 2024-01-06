// src/probability.ts

export interface Probabilities {
    hypotheses: { [key: string]: number };
    evidence: {
      [key: string]: { [key: string]: number };
    };
  }
  
  // Function to calculate the prior probability of a hypothesis
  function priorProbability(probabilities: Probabilities, hypothesis: string): number {
    return probabilities.hypotheses[hypothesis];
  }
  
  // Function to calculate the likelihood of evidence given a hypothesis
  function likelihoodFunction(probabilities: Probabilities, evidence: string, hypothesis: string): number {
    return probabilities.evidence[evidence] ? probabilities.evidence[evidence][hypothesis] || 0 : 0;
  }
  
  // Function to calculate the marginal probability of evidence given all hypotheses
  function marginalProbability(probabilities: Probabilities, hypotheses: string[], evidences: string[]): number {
    let marginal = 0;
    for (let i = 0; i < hypotheses.length; i++) {
      let jointLikelihood = 1;
      for (let j = 0; j < evidences.length; j++) {
        jointLikelihood *= likelihoodFunction(probabilities, evidences[j], hypotheses[i]);
      }
      marginal += priorProbability(probabilities, hypotheses[i]) * jointLikelihood;
    }
    return marginal;
  }
  
  // Function to calculate the posterior probability for Multiple Evidences and Multiple Hypotheses
  function calculatePosteriorMultipleEvidences(
    probabilities: Probabilities,
    hypotheses: string[],
    evidences: string[]
  ): number[] {
    let posteriorProbabilities = [];
  
    // Iterate over each hypothesis
    for (let i = 0; i < hypotheses.length; i++) {
      // Calculate the joint likelihood
      let jointLikelihood = 1;
      for (let j = 0; j < evidences.length; j++) {
        jointLikelihood *= likelihoodFunction(probabilities, evidences[j], hypotheses[i]);
      }
  
      // Calculate the posterior probability
      let posterior =
        (jointLikelihood * priorProbability(probabilities, hypotheses[i])) /
        marginalProbability(probabilities, hypotheses, evidences);
      posteriorProbabilities.push(posterior);
    }
  
    return posteriorProbabilities;
  }
  
  // Function to calculate the posterior probability for Single Evidence and Multiple Hypotheses
  function calculatePosteriorSingleEvidence(
    probabilities: Probabilities,
    hypotheses: string[],
    evidence: string
  ): number[] {
    let posteriorProbabilities = [];
  
    // Iterate over each hypothesis
    for (let i = 0; i < hypotheses.length; i++) {
      // Calculate the posterior probability
      let posterior =
        (likelihoodFunction(probabilities, evidence, hypotheses[i]) * priorProbability(probabilities, hypotheses[i])) /
        marginalProbability(probabilities, hypotheses, [evidence]);
      posteriorProbabilities.push(posterior);
    }
  
    return posteriorProbabilities;
  }
  
  export { calculatePosteriorMultipleEvidences, calculatePosteriorSingleEvidence };
  