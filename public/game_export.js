"use strict";

export {
  SelectionSort,
  InsertionSort,
  BubbleSort,
  MergeSort,
  MaxHeapSort,
  ShellSort,
};

function SortBase(...args) {
  this.positionValues = null;
  this.solution = null;
  this.solutionLength = null;
  this.solutionStep = 0;
  this.numValues = null;
  this.genArrayMin = 0;
  args.length !== 0 ? (this.positionValues = args) : null;

  this.updateSolution = () => {
    this.solution = this.solve();
    this.solutionLength = this.solution.length;
  };

  this.setNewPositionValues = (values) => {
    this.positionValues = values;
    this.updateSolution();
    return true;
  };

  this.generateArray = (num) => {
    if (num < 5) {
      return false;
    }
    let arr = [];
    while (!this.solve() || this.solve().length < this.genArrayMin) {
      arr = [];
      for (let i = 1; i < num + 1; i++) {
        arr.push(i);
      }
      arr.sort(() => Math.random() - 0.5);
      this.positionValues = arr;
    }
    this.updateSolution();
    return true;
  };

  this.checkSolution = (arr) => {
    if (
      JSON.stringify(this.solution[this.solutionStep]) === JSON.stringify(arr)
    ) {
      this.positionValues = [...this.solution[this.solutionStep]];
      this.solutionStep++;
      return true;
    }
    return false;
  };
}

function SelectionSort(...args) {
  SortBase.call(this, args);

  this.genArrayMin = 4;
  this.extClass = "swappable";

  this.solve = () => {
    if (this.positionValues === null || this.positionValues < 3) {
      return false;
    }
    this.numValues = this.positionValues.length;
    let arr = [...this.positionValues];
    let steps = [];
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[min] > arr[j]) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
        steps.push([...arr]);
      }
    }
    return steps;
  };
}

function InsertionSort(...args) {
  SortBase.call(this, args);

  this.genArrayMin = 4;
  this.extClass = "sortable";

  this.solve = () => {
    if (this.positionValues === null || this.positionValues < 3) {
      return false;
    }
    this.numValues = this.positionValues.length;
    let arr = [...this.positionValues];
    let steps = [];
    let length = arr.length;
    for (let i = 1; i < length; i++) {
      let key = arr[i];
      let prevKey = key;
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
      i === j + 1 ? null : steps.push([...arr]);
    }
    return steps;
  };
}

function BubbleSort(...args) {
  SortBase.call(this, args);

  this.genArrayMin = 8;
  this.extClass = "swappable";

  this.solve = () => {
    if (this.positionValues === null || this.positionValues < 3) {
      return false;
    }
    this.numValues = this.positionValues.length;
    let arr = [...this.positionValues];
    let steps = [];
    let length = arr.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          steps.push([...arr]);
        }
      }
    }
    return steps;
  };
}

function MergeSort(...args) {
  SortBase.call(this, args);

  this.genArrayMin = 8;
  this.extClass = "swappable";

  //testing
  this.solve = () => {
    if (this.positionValues === null || this.positionValues < 3) {
      return false;
    }
    this.numValues = this.positionValues.length;
    let arr = [...this.positionValues];
    let steps = [];
    let merge = (left, right) => {
      let result = [],
        leftLength = left.length,
        rightLength = right.length,
        l = 0,
        r = 0;
      while (l < leftLength && r < rightLength) {
        if (left[l] < right[r]) {
          result.push(left[l]);
          l++;
        } else {
          result.push(right[r]);
          r++;
        }
      }
      return result.concat(left.slice(l)).concat(right.slice(r));
    };
    let mergeSort = (ar) => {
      let len = ar.length;
      if (len < 2) {
        return ar;
      }
      let mid = Math.floor(len / 2),
        left = ar.slice(0, mid),
        right = ar.slice(mid);

      console.log([...ar]);
      return merge(mergeSort(left), mergeSort(right));
    };
    return mergeSort(arr);
    return steps;
  };
}

function MaxHeapSort(...args) {
  SortBase.call(this, args);

  this.genArrayMin = 8;
  this.extClass = "swappable";

  this.solve = () => {
    if (this.positionValues === null || this.positionValues < 3) {
      return false;
    }
    this.numValues = this.positionValues.length;
    let arr = [...this.positionValues];
    let steps = [];
    let length = arr.length;
    function heap_root(input, i) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let max = i;
      left < length && input[left] > input[max] ? (max = left) : null;
      right < length && input[right] > input[max] ? (max = right) : null;
      max == i ? null : (swap(input, i, max), heap_root(input, max));
    }

    function swap(input, index_A, index_B) {
      let temp = input[index_A];
      input[index_A] = input[index_B];
      input[index_B] = temp;
      steps.push([...input]);
    }
    for (let i = Math.floor(length / 2); i >= 0; i -= 1) {
      heap_root(arr, i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      swap(arr, 0, i);
      length--;
      heap_root(arr, 0);
    }

    return steps;
  };
}

function ShellSort(...args) {
  SortBase.call(this, args);

  this.genArrayMin = 8;
  this.extClass = "swappable";

  //Testing
  this.solve = () => {
    if (this.positionValues === null || this.positionValues < 3) {
      return false;
    }
    this.numValues = this.positionValues.length;
    let arr = [...this.positionValues];
    let steps = [];
    let length = arr.length;
    function heap_root(input, i) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let max = i;
      left < length && input[left] > input[max] ? (max = left) : null;
      right < length && input[right] > input[max] ? (max = right) : null;
      max == i ? null : (swap(input, i, max), heap_root(input, max));
    }

    function swap(input, index_A, index_B) {
      let temp = input[index_A];
      input[index_A] = input[index_B];
      input[index_B] = temp;
      steps.push([...input]);
    }
    for (let i = Math.floor(length / 2); i >= 0; i -= 1) {
      heap_root(arr, i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      swap(arr, 0, i);
      length--;
      heap_root(arr, 0);
    }

    return steps;
  };
}
