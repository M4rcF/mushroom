export interface MushroomData {
  'cap-shape': string;
  'cap-surface': string;
  'cap-color': string;
  'bruises': string;
  'odor': string;
  'gill-attachment': string;
  'gill-spacing': string;
  'gill-size': string;
  'gill-color': string;
  'stalk-shape': string;
  'stalk-root': string;
  'stalk-surface-above-ring': string;
  'stalk-surface-below-ring': string;
  'stalk-color-above-ring': string;
  'stalk-color-below-ring': string;
  'veil-color': string;
  'ring-number': string;
  'ring-type': string;
  'spore-print-color': string;
  'population': string;
  'habitat': string;
}

export interface PredictionResult {
  prediction: string;
  edible: boolean;
  poisonous: boolean;
  timestamp?: string;
}

export interface Metrics {
  accuracy: number | null;
  f1_score: number | null;
  precision: number | null;
  recall: number | null;
  created_at: string | null;
  model_type?: string;
  dataset_size?: number;
  features_used?: number;
  test_samples?: number;
  warning?: string;
  class_distribution?: {
    edible: number;
    poisonous: number;
  };
  detailed_report?: {
    e?: {
      precision: number;
      recall: number;
      'f1-score': number;
      support: number;
    };
    p?: {
      precision: number;
      recall: number;
      'f1-score': number;
      support: number;
    };
    accuracy: number;
    'macro avg': {
      precision: number;
      recall: number;
      'f1-score': number;
      support: number;
    };
    'weighted avg': {
      precision: number;
      recall: number;
      'f1-score': number;
      support: number;
    };
  };
}

export interface FieldOption {
  value: string;
  label: string;
}

export const mushroomFields: Record<keyof MushroomData, FieldOption[]> = {
  'cap-shape': [
    { value: 'b', label: 'Bell' },
    { value: 'c', label: 'Conical' },
    { value: 'x', label: 'Convex' },
    { value: 'f', label: 'Flat' },
    { value: 'k', label: 'Knobbed' },
    { value: 's', label: 'Sunken' }
  ],
  'cap-surface': [
    { value: 'f', label: 'Fibrous' },
    { value: 'g', label: 'Grooves' },
    { value: 'y', label: 'Scaly' },
    { value: 's', label: 'Smooth' }
  ],
  'cap-color': [
    { value: 'n', label: 'Brown' },
    { value: 'b', label: 'Buff' },
    { value: 'c', label: 'Cinnamon' },
    { value: 'g', label: 'Gray' },
    { value: 'r', label: 'Green' },
    { value: 'p', label: 'Pink' },
    { value: 'u', label: 'Purple' },
    { value: 'e', label: 'Red' },
    { value: 'w', label: 'White' },
    { value: 'y', label: 'Yellow' }
  ],
  'bruises': [
    { value: 't', label: 'Bruises' },
    { value: 'f', label: 'No Bruises' }
  ],
  'odor': [
    { value: 'a', label: 'Almond' },
    { value: 'l', label: 'Anise' },
    { value: 'c', label: 'Creosote' },
    { value: 'y', label: 'Fishy' },
    { value: 'f', label: 'Foul' },
    { value: 'm', label: 'Musty' },
    { value: 'n', label: 'None' },
    { value: 'p', label: 'Pungent' },
    { value: 's', label: 'Spicy' }
  ],
  'gill-attachment': [
    { value: 'a', label: 'Attached' },
    { value: 'd', label: 'Descending' },
    { value: 'f', label: 'Free' },
    { value: 'n', label: 'Notched' }
  ],
  'gill-spacing': [
    { value: 'c', label: 'Close' },
    { value: 'w', label: 'Crowded' },
    { value: 'd', label: 'Distant' }
  ],
  'gill-size': [
    { value: 'b', label: 'Broad' },
    { value: 'n', label: 'Narrow' }
  ],
  'gill-color': [
    { value: 'k', label: 'Black' },
    { value: 'n', label: 'Brown' },
    { value: 'b', label: 'Buff' },
    { value: 'h', label: 'Chocolate' },
    { value: 'g', label: 'Gray' },
    { value: 'r', label: 'Green' },
    { value: 'o', label: 'Orange' },
    { value: 'p', label: 'Pink' },
    { value: 'u', label: 'Purple' },
    { value: 'e', label: 'Red' },
    { value: 'w', label: 'White' },
    { value: 'y', label: 'Yellow' }
  ],
  'stalk-shape': [
    { value: 'e', label: 'Enlarging' },
    { value: 't', label: 'Tapering' }
  ],
  'stalk-root': [
    { value: 'b', label: 'Bulbous' },
    { value: 'c', label: 'Club' },
    { value: 'u', label: 'Cup' },
    { value: 'e', label: 'Equal' },
    { value: 'z', label: 'Rhizomorphs' },
    { value: 'r', label: 'Rooted' },
    { value: '?', label: 'Missing' }
  ],
  'stalk-surface-above-ring': [
    { value: 'f', label: 'Fibrous' },
    { value: 'y', label: 'Scaly' },
    { value: 'k', label: 'Silky' },
    { value: 's', label: 'Smooth' }
  ],
  'stalk-surface-below-ring': [
    { value: 'f', label: 'Fibrous' },
    { value: 'y', label: 'Scaly' },
    { value: 'k', label: 'Silky' },
    { value: 's', label: 'Smooth' }
  ],
  'stalk-color-above-ring': [
    { value: 'n', label: 'Brown' },
    { value: 'b', label: 'Buff' },
    { value: 'c', label: 'Cinnamon' },
    { value: 'g', label: 'Gray' },
    { value: 'o', label: 'Orange' },
    { value: 'p', label: 'Pink' },
    { value: 'e', label: 'Red' },
    { value: 'w', label: 'White' },
    { value: 'y', label: 'Yellow' }
  ],
  'stalk-color-below-ring': [
    { value: 'n', label: 'Brown' },
    { value: 'b', label: 'Buff' },
    { value: 'c', label: 'Cinnamon' },
    { value: 'g', label: 'Gray' },
    { value: 'o', label: 'Orange' },
    { value: 'p', label: 'Pink' },
    { value: 'e', label: 'Red' },
    { value: 'w', label: 'White' },
    { value: 'y', label: 'Yellow' }
  ],
  'veil-color': [
    { value: 'n', label: 'Brown' },
    { value: 'o', label: 'Orange' },
    { value: 'w', label: 'White' },
    { value: 'y', label: 'Yellow' }
  ],
  'ring-number': [
    { value: 'n', label: 'None' },
    { value: 'o', label: 'One' },
    { value: 't', label: 'Two' }
  ],
  'ring-type': [
    { value: 'c', label: 'Cobwebby' },
    { value: 'e', label: 'Evanescent' },
    { value: 'f', label: 'Flaring' },
    { value: 'l', label: 'Large' },
    { value: 'n', label: 'None' },
    { value: 'p', label: 'Pendant' },
    { value: 's', label: 'Sheathing' },
    { value: 'z', label: 'Zone' }
  ],
  'spore-print-color': [
    { value: 'k', label: 'Black' },
    { value: 'n', label: 'Brown' },
    { value: 'b', label: 'Buff' },
    { value: 'h', label: 'Chocolate' },
    { value: 'r', label: 'Green' },
    { value: 'o', label: 'Orange' },
    { value: 'u', label: 'Purple' },
    { value: 'w', label: 'White' },
    { value: 'y', label: 'Yellow' }
  ],
  'population': [
    { value: 'a', label: 'Abundant' },
    { value: 'c', label: 'Clustered' },
    { value: 'n', label: 'Numerous' },
    { value: 's', label: 'Scattered' },
    { value: 'v', label: 'Several' },
    { value: 'y', label: 'Solitary' }
  ],
  'habitat': [
    { value: 'g', label: 'Grasses' },
    { value: 'l', label: 'Leaves' },
    { value: 'm', label: 'Meadows' },
    { value: 'p', label: 'Paths' },
    { value: 'u', label: 'Urban' },
    { value: 'w', label: 'Waste' },
    { value: 'd', label: 'Woods' }
  ]
};



