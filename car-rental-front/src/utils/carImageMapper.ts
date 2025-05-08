// This utility helps map car brands and models to appropriate image URLs

// Base URL for car images
const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/abrahamcalf/car-makes-logos/master/logos/';

// Default image if no specific match is found
const DEFAULT_CAR_IMAGE = 'https://via.placeholder.com/400x220?text=Car+Image';

// Brand-specific image URLs
const brandLogoUrls: Record<string, string> = {
  'Toyota': `${BASE_IMAGE_URL}toyota.png`,
  'Honda': `${BASE_IMAGE_URL}honda.png`,
  'Ford': `${BASE_IMAGE_URL}ford.png`,
  'BMW': `${BASE_IMAGE_URL}bmw.png`,
  'Mercedes': `${BASE_IMAGE_URL}mercedes.png`,
  'Audi': `${BASE_IMAGE_URL}audi.png`,
  'Volkswagen': `${BASE_IMAGE_URL}volkswagen.png`,
  'Nissan': `${BASE_IMAGE_URL}nissan.png`,
  'Hyundai': `${BASE_IMAGE_URL}hyundai.png`,
  'Kia': `${BASE_IMAGE_URL}kia.png`,
  'Mazda': `${BASE_IMAGE_URL}mazda.png`,
  'Subaru': `${BASE_IMAGE_URL}subaru.png`,
  'Lexus': `${BASE_IMAGE_URL}lexus.png`,
  'Chevrolet': `${BASE_IMAGE_URL}chevrolet.png`,
  'Volvo': `${BASE_IMAGE_URL}volvo.png`,
  'Tesla': `${BASE_IMAGE_URL}tesla.png`,
  'Porsche': `${BASE_IMAGE_URL}porsche.png`,
  'Jeep': `${BASE_IMAGE_URL}jeep.png`,
  'Land Rover': `${BASE_IMAGE_URL}land-rover.png`,
  'Jaguar': `${BASE_IMAGE_URL}jaguar.png`,
};

// Model images organized by brand with multiple image options for each model
const modelImagesByBrand: Record<string, Record<string, string[]>> = {
  'Toyota': {
    'Corolla': [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9553065/pexels-photo-9553065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9553061/pexels-photo-9553061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/12318326/pexels-photo-12318326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'Camry': [
      'https://images.pexels.com/photos/9642358/pexels-photo-9642358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4061229/pexels-photo-4061229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'RAV4': [
      'https://images.pexels.com/photos/112455/pexels-photo-112455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Honda': {
    'Civic': [
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/13162142/pexels-photo-13162142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11320046/pexels-photo-11320046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'Accord': [
      'https://images.pexels.com/photos/11523543/pexels-photo-11523543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/13162144/pexels-photo-13162144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'CR-V': [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'BMW': {
    '3 Series': [
      'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    '5 Series': [
      'https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'X5': [
      'https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Mercedes': {
    'C-Class': [
      'https://images.pexels.com/photos/2127015/pexels-photo-2127015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'E-Class': [
      'https://images.pexels.com/photos/193995/pexels-photo-193995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    'S-Class': [
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/831475/pexels-photo-831475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Ford': {
    'Focus': [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Hyundai': {
    'Elantra': [
      'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Nissan': {
    'Rogue': [
      'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5512607/pexels-photo-5512607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Volkswagen': {
    'Golf': [
      'https://images.pexels.com/photos/1592261/pexels-photo-1592261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1073532/pexels-photo-1073532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Chevrolet': {
    'Impala': [
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/44493/pexels-photo-44493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Kia': {
    'Sportage': [
      'https://images.pexels.com/photos/1648416/pexels-photo-1648416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5086526/pexels-photo-5086526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'Tesla': {
    'Model 3': [
      'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/13578266/pexels-photo-13578266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/12188016/pexels-photo-12188016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  }
};

// Car model images for specific models
// This simplifies the carModelImages structure to a flat map for compatibility with existing code
const carModelImages: Record<string, Record<string, string>> = {};

// Convert the multi-image arrays into single images with random selection
Object.keys(modelImagesByBrand).forEach(brand => {
  carModelImages[brand] = {};
  Object.keys(modelImagesByBrand[brand]).forEach(model => {
    const images = modelImagesByBrand[brand][model];
    // Choose a random image from the array for initial setup
    const randomIndex = Math.floor(Math.random() * images.length);
    carModelImages[brand][model] = images[randomIndex];
  });
});

// Category-based images (for when we don't have a specific brand/model match)
const categoryImages: Record<string, string> = {
  'SUV': 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Sedan': 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Hatchback': 'https://images.pexels.com/photos/93632/pexels-photo-93632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Coupe': 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Sports Car': 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Convertible': 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Minivan': 'https://images.pexels.com/photos/14861099/pexels-photo-14861099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Truck': 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Luxury': 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  // Categories from the SQL data (lowercase as they appear in the database)
  'suv': 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'compact': 'https://images.pexels.com/photos/2071725/pexels-photo-2071725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'economy': 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'truck': 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'van': 'https://images.pexels.com/photos/8331511/pexels-photo-8331511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

/**
 * Get the appropriate image URL for a car based on brand, model, and category
 */
export const getCarImageUrl = (brand: string, model: string, category: string): string => {
  // Use verified car images only
  // Check known good car images for this specific brand and model first
  const verifiedCarImages: Record<string, Record<string, string>> = {
    'Toyota': {
      'Corolla': 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'Camry': 'https://images.pexels.com/photos/4061229/pexels-photo-4061229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'RAV4': 'https://images.pexels.com/photos/112455/pexels-photo-112455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    'Honda': {
      'Civic': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'Accord': 'https://images.pexels.com/photos/11523543/pexels-photo-11523543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'CR-V': 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    'BMW': {
      '3 Series': 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      '5 Series': 'https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'X5': 'https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    'Mercedes': {
      'C-Class': 'https://images.pexels.com/photos/2127015/pexels-photo-2127015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'E-Class': 'https://images.pexels.com/photos/193995/pexels-photo-193995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'S-Class': 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  };
  
  // If we have a verified image for this brand and model, use it
  if (verifiedCarImages[brand] && verifiedCarImages[brand][model]) {
    return verifiedCarImages[brand][model];
  }
  
  // Safe category images (confirmed to be actual cars)
  const safeCategories: Record<string, string> = {
    'SUV': 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Sedan': 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Hatchback': 'https://images.pexels.com/photos/93632/pexels-photo-93632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Coupe': 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Sports Car': 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Convertible': 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Minivan': 'https://images.pexels.com/photos/14861099/pexels-photo-14861099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Truck': 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'Luxury': 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'suv': 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'compact': 'https://images.pexels.com/photos/2071725/pexels-photo-2071725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'economy': 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'truck': 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'van': 'https://images.pexels.com/photos/8331511/pexels-photo-8331511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };
  
  // If not found, use a safe category image
  if (safeCategories[category]) {
    return safeCategories[category];
  }
  
  // If no category image, use the brand logo
  if (brandLogoUrls[brand]) {
    return brandLogoUrls[brand];
  }
  
  // If all else fails, use the default image
  return DEFAULT_CAR_IMAGE;
};

/**
 * Get the logo URL for a car brand
 */
export const getBrandLogoUrl = (brand: string): string => {
  return brandLogoUrls[brand] || DEFAULT_CAR_IMAGE;
}; 