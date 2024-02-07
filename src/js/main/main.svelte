<script lang="ts">
  import "../index.scss";
  import { evalTS, subscribeBackgroundColor } from "../lib/utils/bolt";
  import { sampleLayers } from "./sample";
  import type { LayerObj } from "../global";
  import { log } from "console";

  let layers: LayerObj[] = [];
  let backgroundColor = "rgb(35, 35, 35)";
  const outTransitions = ["up", "right", "fade", "none"];
  const inTransitions = ["down", "left", "fade"];
  const prevBehaviors = ["keep", "flush"];
  const getLayers = () => {
    if (window.cep) {
      evalTS("getPanels").then((res) => {
        // console.log(res);
        layers = res;
      });
    } else {
      layers = sampleLayers;
    }
  };
  const animateLayers = () => {
    console.log(layers);
    evalTS("animatePhotoshop", layers);
  };
  const panLayer = () => {
    evalTS("panLayer", null, null);
  };
  const renderComps = () => {
    evalTS("render").then((res) => {
      console.log(res);
    });
  };
  if (window.cep) {
    subscribeBackgroundColor((color) => {
      backgroundColor = color;
    });
  }
</script>

<div style={`background-color: ${backgroundColor}`} class="app">
  <div class="flex-row">
    <button class="button" on:click={animateLayers}>Animate!</button>
    <button class="button" on:click={panLayer}>Pan!</button>
    <button
      class="button"
      on:click={() => {
        evalTS("updateValues");
      }}>Update Values!</button
    >
    <button on:click={getLayers}>Load!</button>
    <button class="button" on:click={renderComps}>Render!</button>
    <button
      class="button"
      on:click={() => {
        evalTS("addAudios");
      }}>Speak!</button
    >
  </div>
  <div class="panel-item-title">
    <span>Layer</span>
    <span>In</span>
    <span>Prev</span>
    <span>Count</span>
    <span>Darken</span>
  </div>
  <div class="panel-container">
    {#each layers as layer}
      <div class="panel-item-parent">
        <div class="panel-item">
          <span><i>{layer.index + ". " + layer.name}</i></span>
          <!-- In -->

          <button
            class="list-button"
            style={layer.index === 1
              ? `background-color: ${backgroundColor}; border-color: ${backgroundColor}; `
              : ""}
            on:click={() => {
              if (layer.index === 1) return;
              let inIndex = inTransitions.indexOf(layer.in);
              layer.in = inTransitions[(inIndex + 1) % inTransitions.length];
            }}
          >
            {layer.index !== 1 ? layer.in : ""}
          </button>
          <!-- Out -->
          <button
            class="list-button"
            style={layer.index === 1
              ? `background-color: ${backgroundColor}; border-color: ${backgroundColor}; `
              : ""}
            on:click={() => {
              if (layer.index === 1) return;
              let prevIndex = prevBehaviors.indexOf(layer.prev);
              layer.prev =
                prevBehaviors[(prevIndex + 1) % prevBehaviors.length];
              for (let i = 0; i < layer.index - 1; i++) {
                for (
                  let j = layer.index - i - 1;
                  j < layers[i].out.length;
                  j++
                ) {
                  if (layer.prev === "flush") {
                    layers[i].out[j] = "x";
                  } else if (layer.prev === "keep") {
                    layers[i].out[j] = "up";
                  }
                }
              }
            }}
          >
            {layer.index !== 1 ? layer.prev : ""}
          </button>
          <!-- Count -->
          <input
            type="number"
            class="number-input"
            min="1"
            bind:value={layer.count}
          />
          <input type="checkbox" bind:checked={layer.darken} />
        </div>
        <div class="out-items">
          <span><b>Out: </b> </span>
          {#each layers[layer.index - 1].out as outTransition, i}
            <div class="flex-row">
              {#if outTransition !== "x"}
                <span
                  >{layers.length -
                    layers[layer.index - 1].out.length +
                    i +
                    1}.</span
                >
                <button
                  class="out-button"
                  on:click={() => {
                    let outTransitionIndex =
                      outTransitions.indexOf(outTransition);
                    outTransition =
                      outTransitions[
                        (outTransitionIndex + 1) % outTransitions.length
                      ];
                    for (let j = i + 1; j < layer.out.length; j++) {
                      // console.log(j);
                      if (
                        outTransitions[
                          (outTransitionIndex + 1) % outTransitions.length
                        ] === "fade"
                      ) {
                        layer.out[j] = "x";
                      } else {
                        layer.out[j] = "up";
                      }
                    }
                  }}
                >
                  {outTransition}
                </button>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .panel-item-parent {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.25rem;
    margin-bottom: 0.25rem;
  }
  .out-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  .panel-item {
    display: grid;
    grid-template-columns: 7rem 3.5rem 3.5rem 2rem 3rem;
    align-items: center;
    width: 100%;
  }
  .panel-item-title {
    display: grid;
    grid-template-columns: 7rem 3.5rem 3.5rem 3.5rem 3rem;
    align-items: center;
    margin-bottom: 0.75rem;
    width: 100%;
    span {
      font-weight: bold;
      font-size: 0.75rem;
    }
  }
  .panel-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
  }
  .out-button {
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    color: #ff6666;
    border: 1px solid #ff6666;
    margin-bottom: 0rem;
    line-height: 0 !important; /* NEW */
  }
  .list-button {
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ff6666;
    height: 1.5rem;
    border-radius: 0.3rem;
    background-color: #0f0f0f;
    margin-bottom: 0rem;
    line-height: 0 !important; /* NEW */
  }
  input {
    text-align: center;
    border-radius: 0.3rem;
    color: white;
    border: 1px solid #ff6666;
    height: 1.3rem;
    background-color: #0f0f0f;
    margin-bottom: 0rem;
  }

  input[type="checkbox"] {
    height: 1.3rem;
    color: #ff6666;
  }
</style>
