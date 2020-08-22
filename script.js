class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    /* menghapus semua output atau set default ketika refresh halaman */
    clear() {
        /* nama variabel bebas */
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    /* hanya menghapus angka yg terakhir diinput */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /* menginisialisasi angka atau nomor yang dipilih */
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    /* menginisialisasi operation yang dipilih */
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /* menghitung angka */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case ':':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    /* menampilkan format currency, decimal */
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    /* menampilkan angka atau nomor yang dipilih */
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

/* inisialisasi element html pada variabel */
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

/* inisialisasi class pada variabel */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

/* panggil function dengan event click pada button nomor/angka (1,2,3,4,5,6,7,8,9,0,.) */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

/* panggil function dengan event click pada button operation (+,/,-,:) */
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

/* panggil function dengan event click pada button equals (=) */
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

/* panggil function dengan event click pada button all clear (AC) */
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

/* panggil function dengan event click pada button delete (DEL) */
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
