export { SelectionSort, InsertionSort }

function SelectionSort(...args) {
    this.extClass = "swappable";
    this.positionValues = null;
    this.solution = null;
    this.solutionLength = null;
    this.solutionStep = 0;
    this.numValues = null;
    args.length !== 0 ? this.positionValues = args : null;
    this.updateSolution = () => {
        this.solution = this.solve();
        this.solutionLength = this.solution.length;
    }

    this.setNewPositionValues = (values) => {
        this.positionValues = values;
        this.updateSolution();
        return true;
    }

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
    }

    this.generateArray = (num) => {
        if (num < 5) {
            return false;
        }
        let arr = [];
        while (!this.solve() || this.solve().length < 3) {
            arr = [];
            for (let i = 1; i < num + 1; i++) {
                arr.push(i);
            }
            arr.sort(() => Math.random() - 0.5);
            this.positionValues = arr;
        }
        this.updateSolution();
        return true;
    }

    this.checkSolution = (arr) => {

        console.log(arr, JSON.stringify(this.solution[this.solutionStep]), JSON.stringify(arr))
        if (JSON.stringify(this.solution[this.solutionStep]) === JSON.stringify(arr)) {
            this.positionValues = [...this.solution[this.solutionStep]];
            this.solutionStep++;
            return true;
        }
        return false;
    }
}

function InsertionSort(...args) {
    this.extClass = "sortable";
    this.positionValues = null;
    this.solution = null;
    this.solutionLength = null;
    this.solutionStep = 0;
    this.numValues = null;
    args.length !== 0 ? this.positionValues = args : null;

    this.updateSolution = () => {
        this.solution = this.solve();
        this.solutionLength = this.solution.length;
    }

    this.setNewPositionValues = (values) => {
        this.positionValues = values;
        this.updateSolution();
        return true;
    }

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
            i===j+1?null:steps.push([...arr]);
            
        }
        return steps;
    }

    this.generateArray = (num) => {
        if (num < 5) {
            return false;
        }
        let arr = [];
        while (!this.solve() || this.solve().length < 3) {
            arr = [];
            for (let i = 1; i < num + 1; i++) {
                arr.push(i);
            }
            arr.sort(() => Math.random() - 0.5);
            this.positionValues = arr;
        }

        this.updateSolution();
        return true;
    }

    this.checkSolution = (arr) => {

        //console.log(arr, JSON.stringify(this.solution[this.solutionStep]), JSON.stringify(arr))
        if (JSON.stringify(this.solution[this.solutionStep]) === JSON.stringify(arr)) {
            this.positionValues = [...this.solution[this.solutionStep]];
            this.solutionStep++;
            return true;
        }
        return false;
    }
}