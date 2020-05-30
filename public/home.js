

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
