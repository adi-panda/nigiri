<script lang="ts">
  import "../index.scss";
  import { evalTS, subscribeBackgroundColor } from "../lib/utils/bolt";
  import { sampleLayers } from "./sample";
  import type { LayerObj } from "../global";

  let layers: LayerObj[] = [];
  let backgroundColor = "rgb(35, 35, 35)";
  let outDialog = false;
  let outDialogIndex = 0;
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
  if (window.cep) {
    subscribeBackgroundColor((color) => {
      backgroundColor = color;
    });
  }
</script>

<div style={`background-color: ${backgroundColor}`} class="app">
  <div class="flex-row">
    <button class="button" on:click={animateLayers}>Animate!</button>
    <button
      class="button"
      on:click={() => {
        evalTS("updateValues");
      }}>Update Values!</button
    >
    <button on:click={getLayers}>Load!</button>
  </div>
  <div class="panel-item-title">
    <span>Layer</span>
    <span>In</span>
    <span>Out</span>
    <span>Prev</span>
    <span>Count</span>
    <span>Darken</span>
  </div>
  <div class="panel-container">
    {#each layers as layer}
      <div class="panel-item">
        <span>{layer.index + ". " + layer.name}</span>
        <!-- In -->
        <select bind:value={layer.in}>
          <option value="down">Down</option>
          <option value="left">Left</option>
        </select>
        <!-- Out -->
        <button
          on:click={() => {
            outDialog = true;
            outDialogIndex = layer.index - 1;
          }}
          class="out-button"
        >
          Out
        </button>
        <!-- Prev -->
        <select bind:value={layer.prev}>
          <option value="keep">Keep</option>
          <option value="flush">Flush</option>
        </select>
        <input
          type="number"
          class="number-input"
          min="1"
          bind:value={layer.count}
        />
        <input type="checkbox" bind:checked={layer.darken} />
      </div>
    {/each}
    {#if outDialog}
      <div class="out-dialog">
        <span>Layer: {outDialogIndex + 1} Out</span>
        {#each layers[outDialogIndex].out as outTransition, i}
          <div class="flex-row">
            <span
              >{layers.length -
                layers[outDialogIndex].out.length +
                i +
                1}.</span
            >
            <select bind:value={outTransition}>
              <option value="up">Up</option>
              <option value="right">Right</option>
            </select>
          </div>
        {/each}
        <button
          on:click={() => {
            outDialog = false;
          }}>Close</button
        >
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: auto;
    height: 100vh;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
  }
  .out-dialog {
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(5px);
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
  }
  .panel-item {
    display: grid;
    grid-template-columns: 7rem 3.5rem 3.5rem 3.5rem 2rem 3rem;
    align-items: center;
    width: 100%;
  }
  .panel-item-title {
    display: grid;
    grid-template-columns: 7rem 3.5rem 3.5rem 3.5rem 3.5rem 3rem;
    align-items: center;
    margin-bottom: 0.75rem;
    width: 100%;
    span {
      font-weight: bold;
    }
  }
  span {
    font-size: 0.75rem;
  }
  input,
  select {
    width: 100%;
  }
  .panel-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
  }
  button {
    font-size: 0.75rem;
    background-color: rgba(0, 0, 0, 0);
    padding: 0.5rem;
    text-align: center;
    vertical-align: middle;
    color: white;
    border: #ff6666 solid 0.2rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
    outline: none;
  }
  .out-button {
    text-align: bottom;
    vertical-align: bottom;
    justify-self: bottom;
    color: #ff6666;
    border: none;
    margin-bottom: 0rem;
    padding: 0;
    height: 1rem;
  }
  button:hover {
    background-color: #d9d9d915;
  }
</style>
