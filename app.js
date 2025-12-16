let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const canvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = canvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const download = document.querySelector("#download-btn");
const presetContainer = document.querySelector(".presets");

let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

function createFilterElem(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerHTML = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", function (event) {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElem(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max
    );

    filtersContainer.appendChild(filterElement);
  });
}
createFilters();

imgInput.addEventListener("change", function (e) {
  file = e.target.files[0];
  const imagePlace = document.querySelector(".placeholder");
  imagePlace.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.filter = `
     brightness{${filters.brightness.value}${filters.brightness.unit}}
     contrast{${filters.contrast.value}${filters.contrast.unit}}
     saturation{${filters.saturation.value}${filters.saturation.unit}}
     hueRotation{${filters.hueRotation.value}${filters.hueRotation.unit}}
     blur{${filters.blur.value}${filters.blur.unit}}
     grayscale{${filters.grayscale.value}${filters.grayscale.unit}}
     sepia{${filters.sepia.value}${filters.sepia.unit}}
     opacity{${filters.opacity.value}${filters.opacity.unit}}
     invert{${filters.invert.value}${filters.invert.unit}}

  `.trim();
  canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", function () {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();

  filtersContainer.innerHTML = "";
  createFilters();
});

download.addEventListener("click", function () {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.herf = canvas.toDataURl();
  link.click();
});

const presets = {
  // 1️⃣ Old School / Retro
  oldSchool: {
    brightness: 110,
    contrast: 90,
    saturation: 70,
    sepia: 50,
    grayscale: 10,
    hueRotation: 15,
    blur: 0,
    opacity: 100,
    invert: 0,
  },

  // 2️⃣ Vintage
  vintage: {
    brightness: 105,
    contrast: 85,
    saturation: 80,
    sepia: 40,
    grayscale: 5,
    hueRotation: 8,
    blur: 0,
    opacity: 100,
    invert: 0,
  },

  // 3️⃣ Cinematic (Teal–Orange vibe)
  cinematic: {
    brightness: 95,
    contrast: 130,
    saturation: 120,
    sepia: 0,
    grayscale: 0,
    hueRotation: 330,
    blur: 1,
    opacity: 100,
    invert: 0,
  },

  // 4️⃣ Black & White
  blackAndWhite: {
    brightness: 110,
    contrast: 120,
    saturation: 0,
    grayscale: 100,
    sepia: 0,
    hueRotation: 0,
    blur: 0,
    opacity: 100,
    invert: 0,
  },

  // 5️⃣ Warm Tone
  warm: {
    brightness: 105,
    contrast: 110,
    saturation: 120,
    sepia: 20,
    hueRotation: 10,
    grayscale: 0,
    blur: 0,
    opacity: 100,
    invert: 0,
  },

  // 6️⃣ Cool Tone
  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 90,
    sepia: 0,
    hueRotation: 200,
    grayscale: 0,
    blur: 0,
    opacity: 100,
    invert: 0,
  },

  // 7️⃣ Fade / Matte Look
  faded: {
    brightness: 110,
    contrast: 80,
    saturation: 90,
    sepia: 10,
    grayscale: 0,
    hueRotation: 0,
    blur: 0,
    opacity: 95,
    invert: 0,
  },

  // 8️⃣ Dramatic
  dramatic: {
    brightness: 90,
    contrast: 150,
    saturation: 110,
    sepia: 0,
    grayscale: 0,
    hueRotation: 0,
    blur: 0,
    opacity: 100,
    invert: 0,
  },

  // 9️⃣ Soft Blur
  soft: {
    brightness: 105,
    contrast: 95,
    saturation: 100,
    sepia: 0,
    grayscale: 0,
    hueRotation: 0,
    blur: 2,
    opacity: 100,
    invert: 0,
  },

  // 🔟 Inverted
  inverted: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    grayscale: 0,
    hueRotation: 0,
    blur: 0,
    opacity: 100,
    invert: 100,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement("button");
  presetButton.classList.add("btn");
  presetButton.innerText = presetName;
  presetContainer.appendChild(presetButton);


 presetButton.addEventListener("click",()=>{
    
   const preset = presets[presetName]

   Object.keys(preset).forEach(fi)
   
 })

});
