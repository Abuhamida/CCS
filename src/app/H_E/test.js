// Given probabilities
let probabilities = {
    hypotheses: { h1: 0.40, h2: 0.35, h3: 0.25 },
    evidence: {
        e1: { h1: 0.3, h2: 0.8, h3: 0.5 },
        e2: { h1: 0.9, h2: 0.0, h3: 0.7 },
        e3: { h1: 0.6, h2: 0.7, h3: 0.9 }
    }
};

// Function to calculate the prior probability of a hypothesis
function priorProbability(hypothesis) {
    return probabilities.hypotheses[hypothesis];
}

// Function to calculate the likelihood of evidence given a hypothesis
function likelihoodFunction(evidence, hypothesis) {
    return probabilities.evidence[evidence] ? (probabilities.evidence[evidence][hypothesis] || 0) : 0;
}



// Function to calculate the marginal probability of evidence given all hypotheses
function marginalProbability(hypotheses, evidences) {
    let marginal = 0;
    for (let i = 0; i < hypotheses.length; i++) {
        let jointLikelihood = 1;
        for (let j = 0; j < evidences.length; j++) {
            jointLikelihood *= likelihoodFunction(evidences[j], hypotheses[i]);
        }
        marginal += priorProbability(hypotheses[i]) * jointLikelihood;
    }
    return marginal;
}

// Function to calculate the posterior probability for Multiple Evidences and Multiple Hypotheses
function calculatePosteriorMultipleEvidences(hypotheses, evidences) {
    let posteriorProbabilities = [];
    
    // Iterate over each hypothesis
    for (let i = 0; i < hypotheses.length; i++) {
        // Calculate the joint likelihood
        let jointLikelihood = 1;
        for (let j = 0; j < evidences.length; j++) {
            jointLikelihood *= likelihoodFunction(evidences[j], hypotheses[i]);
        }
        
        // Calculate the posterior probability
        let posterior = (jointLikelihood * priorProbability(hypotheses[i])) / marginalProbability(hypotheses, evidences);
        posteriorProbabilities.push(posterior);
    }
    
    return posteriorProbabilities;
}

// Function to calculate the posterior probability for Single Evidence and Multiple Hypotheses
function calculatePosteriorSingleEvidence(hypotheses, evidence) {
    let posteriorProbabilities = [];
    
    // Iterate over each hypothesis
    for (let i = 0; i < hypotheses.length; i++) {
        // Calculate the posterior probability
        let posterior = (likelihoodFunction(evidence, hypotheses[i]) * priorProbability(hypotheses[i])) / marginalProbability(hypotheses, [evidence]);
        posteriorProbabilities.push(posterior);
    }
    
    return posteriorProbabilities;
}

// Example usage:
let hypotheses = ['h1', 'h2', 'h3'];
let evidences = ['e1', 'e2', 'e3'];

// Calculate posterior probabilities for Multiple Evidences and Multiple Hypotheses
let posteriorMultipleEvidences = calculatePosteriorMultipleEvidences(hypotheses, evidences);
console.log('Posterior probabilities (Multiple Evidences and Multiple Hypotheses):', posteriorMultipleEvidences);

// Calculate posterior probabilities for Single Evidence and Multiple Hypotheses
let evidence = 'e3'; // Replace with the specific evidence

let posteriorSingleEvidence = calculatePosteriorSingleEvidence(hypotheses, evidence);
console.log('Posterior probabilities (Single Evidence and Multiple Hypotheses):', posteriorSingleEvidence);


let observedEvidences = ['e1', 'e3']; // Observe both E1 and E3

// Calculate posterior probabilities for Multiple Evidences and Multiple Hypotheses
let posteriorMultipleEvidences2 = calculatePosteriorMultipleEvidences(hypotheses, observedEvidences);
console.log('Posterior probabilities (Multiple Evidences E1 and E3 and Multiple Hypotheses):', posteriorMultipleEvidences2);

let evidence2 = 'e3'; // Replace with the specific evidence
let h = ['h2']
let posteriorSingleEvidence2 = calculatePosteriorSingleEvidence(h, evidence2);
console.log('Posterior probabilities (Single Evidence):', posteriorSingleEvidence);