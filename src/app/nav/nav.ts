interface Sample {
  decision: string;
  features: Record<string, string>;
}

export default class Classifier {
  private classProbabilities: Record<string, number> = {};
  private featureProbabilities: Record<
    string,
    Record<string, Record<string, number>>
  > = {};

  train(data: Sample[]) {
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
        const totalValues = Object.values(
          this.featureProbabilities[feature][decision]
        ).reduce((acc, count) => acc + count, 0);

        Object.keys(this.featureProbabilities[feature][decision]).forEach(
          (value) => {
            this.featureProbabilities[feature][decision][value] /= totalValues;
          }
        );
      });
    });
  }

  predict(features: Record<string, string>) {
    const probabilities: Record<string, number> = {};
    let maxProbability = -Infinity;
    let predictedDecision: string | null = null;

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


      probabilities[decision] = probability;

      if (probability > maxProbability) {
        maxProbability = probability;
        predictedDecision = decision;
      }
    });

    return { predictedDecision, probabilities };
  }
}
