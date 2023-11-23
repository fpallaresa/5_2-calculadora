const operator = document.querySelectorAll('.button--operator');
const operand = document.querySelectorAll('.button--operand');
const clear = document.querySelector('.button--clear');
const equal = document.querySelector('.button--equal');
const resultOperation = document.getElementsByClassName('calculator__result')[0];

if (resultOperation) {
    let currentInfo = '';                                
    let currentOperator = '';
    let pendingValue = '';
  
    function changeScreen() {                     
        resultOperation.textContent = currentInfo;
    }
  
    function applyOperand(value) {                 
        currentInfo += value;                  
        changeScreen();        
    }
  
    function operation(value) {
        if (currentInfo !== '') {
          if (pendingValue !== '') {
            calculation();
          } else {
            pendingValue = currentInfo;
          }
  
          currentInfo = '';
          currentOperator = value;
        }
    }
  
    function calculation() {
      if (pendingValue !== '' && currentInfo !== '') {
        const value1 = Number(pendingValue);
        const value2 = Number(currentInfo);
    
        if (!isNaN(value1) && !isNaN(value2)) {
          switch (currentOperator) {
            case '+':
              currentInfo = (value1 + value2).toString();
              break;
            case '-':
              currentInfo = (value1 - value2).toString();
              break;
            case '*':
              currentInfo = (value1 * value2).toString();
              break;
            case '/':
              if (value2 !== 0) {
                currentInfo = (value1 / value2).toString();
              } else {
                currentInfo = 'Error';
              }
              break;
            default:
              break;
          }
        } else {
          currentInfo = 'Error';
        }
    
        pendingValue = '';
        currentOperator = '';
        changeScreen();
      }
    }
  
    operand.forEach(operand => {                            
        operand.addEventListener('click', function() {      
          applyOperand(operand.getAttribute('value'));     
        });
    });
  
    operator.forEach(operator => {
        operator.addEventListener('click', function() {    
          operation(operator.getAttribute('value'));      
        });
    });
  
    equal.addEventListener('click', function() {
        calculation();
    });
  
    clear.addEventListener('click', function() {          
        currentInfo = '';
        currentOperator = '';
        pendingValue = '';
        changeScreen();
    });
}
