/*
<h1 id="title">CS Algorithm Practice</h1>
    <div>
      <span>Algorithm: </span>
      <select id="gameAlgorithm">
        <option value="none" selected disabled hidden>Select an Option</option>
        <option value="selectionSort">Selection Sort</option>
        <option value="insertionSort">Insertion Sort</option>
        <option value="bubbleSort">Bubble Sort</option>
        <option value="mergeSort">Merge Sort</option>
        <option value="maxHeapSort">Max Heap Sort</option>
      </select>
    </div>
    <div>
      <span>Game Mode: </span>
      <select id="gameMode">
        <option value="none" selected disabled hidden>Select an Option</option>
        <option value="click">Click</option>
        <option value="drop">Drop</option>
        <option value="drop2">Drop 2</option>
      </select>
    </div>
    <div>
      <span>Number of Values:</span>
      <select id="numValues">
        <option value="none" selected disabled hidden>Select an Option</option>
        <option value="click">Click</option>
        <option value="drop">Drop</option>
        <option value="drop2">Drop 2</option>
      </select>
    </div>
    <button onclick="handleGo()">GO</button>
*/

const gameAlgorithm = document.querySelector("#gameAlgorithm"),
  gameMode = document.querySelector("#gameMode"),
  numValues = document.querySelector("#numValues");

const handleGo = () => {
  let algVal = gameAlgorithm.value;
  let modeVal = gameMode.value;
  let numVal = parseInt(numValues.value);
  algVal !== "none" && modeVal !== "none" && !isNaN(numVal)
    ? (numVal >= 6 && numVal <= 10 && modeVal === "drop") || modeVal !== "drop"
      ? algVal === "Insertion" && modeVal === "drop"
        ? swal("Combination invalid")
        : (sessionStorage.setItem("alg", algVal),
          sessionStorage.setItem("val", numVal),
          (window.location.href = `/${modeVal}`))
      : swal("You need to have values from 6 to 10 inclusive")
    : swal("Please fill out every field. ");
};
