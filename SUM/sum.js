let choice1 = "Infix";
let choice2 = "Infix";
let expression = "";
let tableBodyString = ""
//hello?
//join call


class InfixToPrefix {
  constructor() {
    this.stack = [];
    this.polish = "";
    this.rank = Number.parseInt(0);
  }
  infixToPrefix(str) {
    let i = 0;
    str += ')';
    this.stack.push('(');

    while (i < str.length) {
      if ((str[i] == '$' || str[i] == '^') && (this.stack[this.stack.length - 1] == '$' || this.stack[this.stack.length - 1] == '^')) {
        this.polish += str[i];
        this.updateRank(str[i]);
      }
      else if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/' || str[i] == '$' || str[i] == '^') {
        while (
          this.stackPrecedenceFunction(this.stack[this.stack.length - 1]) > this.inputPrecedenceFunction(str[i])) {
          if (this.stack[this.stack.length - 1] == '(') {
            break;
          }
          this.polish += this.stack.pop();
          this.updateRank(this.polish[this.polish.length - 1]);
        }
        this.stack.push(str[i]);
      }
      else if (str[i] == ')') {
        while (this.stack[this.stack.length - 1] != '(') {
          this.polish += this.stack.pop();
          this.updateRank(this.polish[this.polish.length - 1]);
        }
        this.stack.pop();
      }
      else if (str[i] == '(') {
        this.stack.push(str[i]);
      }
      else {
        this.polish += str[i];
        this.updateRank(str[i]);
      }

      tableBodyString += `<tr><td>${str[i] ?? "-"}</td><td>${this.stack.join("") ?? "-"}</td><td>${this.polish ?? "-"}</td><td>${this.rank ?? "-"}</td></tr>`;
      i++;
      console.log("called " + this.stack);
    }
    if (this.rank != 1) {
      alert("Invalid Expression !");
    }
    while (this.stack.length != 0) {
      if (this.stack[this.stack.length - 1] != '(' || this.stack[this.stack.length - 1] != ')') {
        this.polish += this.stack[this.stack.length - 1];
        this.stack.pop();
        console.log("Last poped called" + this.stack[this.stack.length - 1]);
        tableBodyString += `<tr><td>${str[i] ?? "-"}</td><td>${this.stack.join("") ?? "-"}</td><td>${this.polish ?? "-"}</td><td>${this.rank ?? "-"}</td></tr>`;
        tableBodyString += `<tr><td>${str[i] ?? "-"}</td><td>${this.stack.join("") ?? "-"}</td><td>${this.polish ?? "-"}</td><td>${this.rank ?? "-"}</td></tr>`;
      }
    }
    return this.polish;
  }

  updateRank(s) {
    switch (s) {
      case "+": this.rank--;
        break;
      case "-": this.rank--;
        break;
      case "*": this.rank--;
        break;
      case "/": this.rank--;
        break;
      case "^": this.rank--;
        break;
      case "$": this.rank--;
        break;
      case "": this.rank--;
        break;
      default:
        this.rank++;
    }
  }

  stackPrecedenceFunction(s) {
    switch (s) {
      case "+":
        return 2;
      case "-":
        return 2;
      case "*":
        return 4;
      case "/":
        return 4;
      case "^":
        return 5;
      case "$":
        return 5;
      case "(":
        return 0;
      default:
        return 8;
    }
  }
  inputPrecedenceFunction(s) {
    switch (s) {
      case "+":
        return 1;
      case "-":
        return 1;
      case "*":
        return 3;
      case "/":
        return 3;
      case "^":
        return 6;
      case "$":
        return 6;
      case "(":
        return 9;
      case ")":
        return 0;
      default:
        return 7;
    }
  }
}


document.getElementById("inputBox").addEventListener('change', (e) => {
  expression = e.target.value;
});
function filter() {
  const arr = ['+', '-', '*', '/', '$', '^', '(', ')', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  expression.trim();
  expression.toLowerCase();
  return true;
}
function selection() {
  let dropdownList1 = document.getElementById("drpd1");
  dropdownList1.onchange = () => {
    let selectedOption = dropdownList1.options[dropdownList1.selectedIndex];
    choice1 = selectedOption.value;
  };
  let dropdownList2 = document.getElementById("drpd2");
  dropdownList2.onchange = () => {
    let selectedOption = dropdownList2.options[dropdownList2.selectedIndex];
    choice2 = selectedOption.value;
  };
}
function Convert() {
  let answerString="abcdefghijk";
  if (filter() === false) {
    document.getElementById('inputBox').value = "";
    return;
  }

  console.log(choice1 + " " + choice2);
  if (choice1 == "Infix" && choice2 == "Prefix") {
    if (expression != null) {

      alert("called");
      let table = document.getElementById("table");
      let itof = new InfixToPrefix();
      table.style.display = "grid";
      answerString=itof.infixToPrefix(expression);
      tableBodyString +=`<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">answer is = ${answerString}</td></tr>`
      table.innerHTML = `<thead><tr><th>Input<br/>Symbol</th><th>Stack</th><th>Reverse Polish Expression</th><th>Rank</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;
      tableBodyString = "";
    }
  }
  else if (choice1 == "Postfix" && choice2 == "Infix") {
    postfixToInfix(expression);
  }
  else if (choice1 == "Prefix" && choice2 == "Infix") {
    prefixToInfix(expression);
  }
}
function postfixToInfix(str) {
  alert("post -> in");
  let stack = [];
  for (let a = 0; a < str.length; a++) {
    let tmp = Number.parseInt(str[a]);
    if (!(isNaN(tmp))) {
      stack.push(tmp);
    }
    else {
      if (str[a] != ' ') {
        num1 = stack.pop();
        num2 = stack.pop();
        switch (str[a]) {
          case '+': ans = num2 + num1; break;
          case '-': ans = num2 - num1; break;
          case '*': ans = num2 * num1; break;
          case '/': ans = num2 / num1; break;
          case '^': ans = Math.pow(num2,num1); break;
          case '$': ans = Math.pow(num2,num1); break;
          default: alert("Not A Valid Number"); break;
        }
        stack.push(ans);
      }
    }
  }
  alert("answer is " + stack.pop())
  stack = [];
}
function prefixToInfix(str) {
  alert("called prefix -> infix");
  let arr=[];
  arr = str.split(" ");
  console.log(arr);
  arr = arr.reverse();
  console.log(arr);
  let stack = [];
  for (let a = 0; a < arr.length; a++) {
    let tmp = Number.parseInt(arr[a]);
    if (!(isNaN(tmp))) {
      stack.push(tmp);
      console.log(stack);
    }
    else {
      let ans;
      if (arr[a] != ' ') {
        num1 = stack.pop();
        num2 = stack.pop();
        console.log("=>"+arr[a])
        switch (arr[a]) {
          case '+': ans = Number.parseInt(num1 + num2); break;
          case '-': ans = Number.parseInt(num1 - num2); break;
          case '*': ans = Number.parseInt(num1 * num2); break;
          case '/': ans = Number.parseInt(num1 / num2); break;
          case '^': ans = Number.parseInt(Math.pow(num2 , num1)); break;
          case '$': ans = Number.parseInt(Math.pow(num2 , num1)); break;
          default: console.log("Not A Valid Number"); break;
        }
        stack.push(ans);
        console.log(stack);
      }
    }
  }
  alert("answer is " + stack.pop())
  stack = [];
}

//- + - + 5 / * 3 2 ^ 4 6 * 11 7 ^ ^ 4 5 2 15
//15 2 5 4 ^ ^ 7 11 * 6 4 ^ 2 3 * / 5 + - + -
//[15,2,5,4]=> 
//4^5=1024=>                          [15,2,1024]
/**^ 1024^2=1048576                   [15,2,1048576,7,11]
 * 11*7 = 77                          [15,2,1048576,77,4096,2,3]
 * 2*3 = 6                            [15,2,1048576,77,4096,6]
 * 6/4096=> 0                         [15,2,1048576,77,0,5]
 * 5+0 => 5                           [15,2,1048576,-72]  
 * 
 */