class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    clear() {
        this.currentresult='';
        this.previousresult='';
        this.operation=undefined;
    }
    delete() {
        this.currentresult=this.currentresult.toString().slice(0, -1);
    }
    appendNumber(number) {
        
    if (number === '.' && this.currentresult.includes('.')) return;
        
        this.currentresult = this.currentresult.toString()+ number.toString();
    }
    chooseOperations(operation) {
        if (currentresult === "") return;
        if (previousresult == !"") {
            this.compute();
        }
        this.operation = operation;
        this.previousresult = this.currentresult;
        this.currentresult = "";
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousresult);
        const curr = parseFloat(this.currentresult);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:return;
        }
        this.currentresult = computation;
        this.operation=undefined;
        this.previousresult = '';
    }
  
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
    
    updateDisplay() {
        this.currentTextElement.innerText =this.getDisplayNumber(this.currentresult);
        if(this.operation!=null){
            this.previousTextElement.innerText=
            `${this.getDisplayNumber(this.previousresult)} ${this.operation}`;
    
        }
        else{
            this.previousTextElement.innerText='';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allclearButton = document.querySelector('[data-all-clear]');
const previousTextElement = document.querySelector('[data-previous-operand]');
const currentTextElement = document.querySelector('[data-current-operand]');
const previousresult = document.querySelector('.previous-result');
const currentresult = document.querySelector('.current-result');
const calculator = new Calculator(previousTextElement, currentTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay();

    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
allclearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})