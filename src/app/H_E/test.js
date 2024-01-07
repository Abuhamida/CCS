class WeatherCarClassifier {
  constructor() {
    this.classProbabilities = {};
    this.featureProbabilities = {};
  }

  train(data) {
    const totalSamples = data.length;
    this.classProbabilities = {};

    data.forEach((sample) => {
      const decision = sample.decision;
      if (!this.classProbabilities[decision]) {
        this.classProbabilities[decision] = 1;
      } else {
        this.classProbabilities[decision]++;
      }
    });

    this.featureProbabilities = {};

    Object.keys(data[0].features).forEach((feature) => {
      this.featureProbabilities[feature] = {};

      data.forEach((sample) => {
        const decision = sample.decision;
        const value = sample.features[feature];

        if (!this.featureProbabilities[feature][decision]) {
          this.featureProbabilities[feature][decision] = {};
        }

        if (!this.featureProbabilities[feature][decision][value]) {
          this.featureProbabilities[feature][decision][value] = 1;
        } else {
          this.featureProbabilities[feature][decision][value]++;
        }
      });
    });

    Object.keys(this.classProbabilities).forEach((decision) => {
      this.classProbabilities[decision] /= totalSamples;
    });

    Object.keys(this.featureProbabilities).forEach((feature) => {
      Object.keys(this.featureProbabilities[feature]).forEach((decision) => {
        const totalValues = Object.values(this.featureProbabilities[feature][decision]).reduce((acc, count) => acc + count, 0);

        Object.keys(this.featureProbabilities[feature][decision]).forEach((value) => {
          this.featureProbabilities[feature][decision][value] /= totalValues;
        });
      });
    });
  }

  predict(features) {
    let maxProbability = -Infinity;
    let predictedDecision = null;
  
    Object.keys(this.classProbabilities).forEach((decision) => {
      let probability = this.classProbabilities[decision];
  
      Object.keys(features).forEach((feature) => {
        const value = features[feature];
  
        if (
          this.featureProbabilities[feature] &&
          this.featureProbabilities[feature][decision] &&
          this.featureProbabilities[feature][decision][value]
        ) {
          probability *= this.featureProbabilities[feature][decision][value];
        }
      });
  
      console.log(`Decision: ${decision}, Probability: ${probability}`);
  
      if (probability > maxProbability) {
        maxProbability = probability;
        predictedDecision = decision;
      }
    });
  
    return predictedDecision;
  }
  
}

// Example usage:

// Training data
const trainingData = [
  { decision: 'go-out', features: { weather: 'sunny', carStatus: 'working' } },
  { decision: 'go-out', features: { weather: 'rainy', carStatus: 'broken' } },
  { decision: 'go-out', features: { weather: 'sunny', carStatus: 'working' } },
  { decision: 'go-out', features: { weather: 'sunny', carStatus: 'working' } },
  { decision: 'go-out', features: { weather: 'sunny', carStatus: 'working' } },
  { decision: 'stay-home', features: { weather: 'rainy', carStatus: 'broken' } },
  { decision: 'stay-home', features: { weather: 'rainy', carStatus: 'broken' } },
  { decision: 'stay-home', features: { weather: 'sunny', carStatus: 'working' } },
  { decision: 'stay-home', features: { weather: 'sunny', carStatus: 'broken' } },
  { decision: 'stay-home', features: { weather: 'rainy', carStatus: 'broken' } },
];

// Test data for prediction
const testData = { weather: 'sunny', carStatus: 'working' };

// Create and train WeatherCarClassifier model
const weatherCarClassifier = new WeatherCarClassifier();
weatherCarClassifier.train(trainingData);

// Make prediction
const prediction = weatherCarClassifier.predict(testData);
console.log('Predicted decision:', prediction);
