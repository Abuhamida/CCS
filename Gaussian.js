class GaussianNaiveBayes {
  constructor() {
    this.classes = {};
  }

  train(data, labels) {
    if (data.length !== labels.length) {
      throw new Error("Data and labels must have the same length");
    }

    for (let i = 0; i < data.length; i++) {
      const features = data[i];
      const label = labels[i];

      if (!this.classes[label]) {
        this.classes[label] = {
          count: 0,
          sum: Array(features.length).fill(0),
          sumSquared: Array(features.length).fill(0),
        };
      }

      this.classes[label].count += 1;

      for (let j = 0; j < features.length; j++) {
        this.classes[label].sum[j] += features[j];
        this.classes[label].sumSquared[j] += Math.pow(features[j], 2);
      }
    }
  }

  predict(data) {
    let probabilities = {};

    for (const label in this.classes) {
      if (this.classes.hasOwnProperty(label)) {
        const classInfo = this.classes[label];
        let classProb = Math.log(classInfo.count);

        for (let i = 0; i < data.length; i++) {
          const mean = classInfo.sum[i] / classInfo.count;
          const variance =
            classInfo.sumSquared[i] / classInfo.count - Math.pow(mean, 2);

          const likelihood = this.calculateGaussianProbability(
            data[i],
            mean,
            variance
          );

          classProb += Math.log(likelihood);
        }

        probabilities[label] = Math.exp(classProb);
      }
    }

    return probabilities;
  }

  calculateGaussianProbability(x, mean, variance) {
    if (variance === 0) {
      const epsilon = 1e-10;
      variance = epsilon;
    }

    const exponent = -((x - mean) ** 2) / (2 * variance);
    return (1 / (Math.sqrt(2 * Math.PI * variance))) * Math.exp(exponent);
  }
}

// Example usage:

const model = new GaussianNaiveBayes();

// Sample training data
const trainingData = [
  [5, 3],
  [7, 2.5],
  [6, 3.5],
  [4, 1.5],
  [8, 1],
  [7, 9],
  [9, 2],
  [6, 8],
];
const labels = ["0", "0", "0", "0", "1", "1", "1", "1"];

// Train the model
model.train(trainingData, labels);

// Make a prediction
const testData = [8, 1];
const probabilities = model.predict(testData);

console.log("Probabilities for each class:");
for (const label in probabilities) {
  console.log(`${label}: ${probabilities[label]}`);
}

// Predicted class
const predictedClass = Object.keys(probabilities).reduce(
  (maxLabel, label) => (probabilities[label] > probabilities[maxLabel] ? label : maxLabel),
  "0"
);

console.log("Predicted class:", predictedClass);
