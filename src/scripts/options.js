import { $ } from "./utils/dom";

const COLOR_HEX = {
    black: "#000000",
    orange: "#d0621a",
    blanc: "#ffffff",
    vert: "#407375",
};

const renderColor = (option) => `
  <div>
    <input type="radio" id="${option.id}" name="color" value="${option.value}" ${option.checked ? "checked": ""}/>
    <label class="checkmark-outer" for="${option.id}">
      <div class="checkmark circle" style="--color:${COLOR_HEX[option.value]||"#000"};${option.value==="blanc"?"border:1px solid var(--secondary-opacity);":""}"></div>
    </label>
  </div>
`;

const renderLine = (name, o, isModel) => `
  <div>
    <input type="radio" id="${o.id}" name="${name}" value="${o.value}" ${o.checked ? "checked": ""} ${o.price!=null?`data-price="${o.price}"`:""}/>
    <div class="checkmark-outer" for="${o.id}">
      <div class="checkmark line">
        <span>${isModel ? `Taille ${String(o.value).toUpperCase()}` : (o.value[0].toUpperCase()+o.value.slice(1))}</span>
        <span>${isModel ? o.price : "+" + o.price}€</span>
      </div>
    </div>
  </div>
`;

export function renderOptions(PRODUCT_DATA, target = ".content-radios") {
  const t = $(target);
  if (!t) return;

  const { color, model, material } = PRODUCT_DATA.options || {};

  t.innerHTML = `
    <div class="radio-item">
      <p>Choix de la couleur</p>
      <div class="item__choices circles">
        ${color.map(renderColor).join("")}
      </div>
    </div>

    <div class="radio-item">
      <div class="radio-item__size">
        <p>Choix du modèle</p>
        <p style="text-decoration: underline; cursor: pointer;">Guide des tailles</p>
      </div>
      <div class="item__choices lines">
        ${model.map(o => renderLine("model", o, true)).join("")}
      </div>
    </div>

    <div class="radio-item">
      <p>Choix de la matière</p>
      <div class="item__choices lines">
        ${material.map(o => renderLine("material", o, false)).join("")}
      </div>
    </div>
  `;
}
