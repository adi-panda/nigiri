<script>
  import "../index.scss";
  import { evalTS, subscribeBackgroundColor } from "../lib/utils/bolt";
  let layers = [];
  let backgroundColor = "#000000";
  const getLayers = () => {
    // evalTS("getPanels").then((res) => {
    //   console.log(res);
    //   layers = res;
    // });
  };
  const animateLayers = () => {
    // evalTS("animatePhotoshop", layers);
  };
  subscribeBackgroundColor((color) => {
    backgroundColor = color;
  });
</script>

<div
  style={`background-color: ${backgroundColor}`}
  class="app"
  on:mouseenter={() => {
    console.log("mouse entered");
    getLayers();
  }}
>
  <h3>nigiri</h3>
  <div class="flex-row">
    <button class="button" on:click={animateLayers}>Animate!</button>
    <button
      class="button"
      on:click={() => {
        evalTS("updateValues");
      }}>Update Values!</button
    >
  </div>
  <div class="panel-item-title">
    <span>Layer</span>
    <span>In</span>
    <span>Out</span>
    <span>Prev</span>
    <span>Count</span>
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
        <select bind:value={layer.out}>
          <option value="up">Up</option>
          <option value="right">Right</option>
        </select>
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
      </div>
    {/each}
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
  .panel-item {
    display: grid;
    grid-template-columns: 7rem 3.5rem 3.5rem 3.5rem 2rem;
    align-items: center;
    width: 100%;
  }
  .panel-item-title {
    display: grid;
    grid-template-columns: 7rem 3.5rem 3.5rem 3.5rem 2rem;
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
  button:hover {
    background-color: #d9d9d915;
  }
</style>
