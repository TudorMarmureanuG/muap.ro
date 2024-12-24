let choice1 = "Infix";
let choice2 = "Infix";
let expression = "";
let tableBodyString = ""

class Conversion {
  constructor() {
    this.stack = [];
    this.polish = "";
    this.rank = Number.parseInt(0);
  }

  infixToPostfix(str, type) {
    let i = 0;
    str += ')';
    this.stack.push('(');

    while (i < str.length) {
      console.log("Hello");
      if ((str[i] == '$' || str[i] == '^') && (this.stack[this.stack.length - 1] == '$' || this.stack[this.stack.length - 1] == '^') && type == 'post') {
        this.polish += str[i];
        this.updateRank(str[i]);
      }
      else if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/' || str[i] == '$' || str[i] == '^') {
        if (type == 'post') {
          while (
            this.stackPrecedenceFunction(this.stack[this.stack.length - 1]) > this.inputPrecedenceFunction(str[i])) {
            if (this.stack[this.stack.length - 1] == '(') {
              break;
            }
            this.polish += this.stack.pop();
            this.updateRank(this.polish[this.polish.length - 1]);
            console.log("Hello from 1");
          }
        }
        else {
          while (
            this.stackPrecedenceFunction(this.stack[this.stack.length - 1]) > this.inputPrecedenceFunction(str[i]) + 1) {
            if (this.stack[this.stack.length - 1] == '(') {
              break;
            }
            this.polish += this.stack.pop();
            this.updateRank(this.polish[this.polish.length - 1]);
            console.log("Hello from 2");
          }
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
      popup(false,"Invalid Expression !");
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

  postfixToInfix(str, type) {
    let i = 0, oprand1 = "", oprand2 = "";
    let stack = [];

    while (i < str.length) {
      if (str[i] == ' ') {
        i++;
        continue;
      }
      else if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/' || str[i] == '$' || str[i] == '^') {
        oprand1 = stack.pop();
        oprand2 = stack.pop();

        if (type == 'pre') {
          stack.push(`(${oprand1}${str[i]}${oprand2})`);
        }
        else {
          stack.push(`(${oprand2}${str[i]}${oprand1})`);
        }
      }
      else {
        stack.push(str[i]);
      }
      console.log(stack);
      tableBodyString += `<tr><td>${(i + 1) ?? "-"}</td><td>${str[i] ?? "-"}</td><td>${stack.join("") ?? "-"}</td></tr>`;

      i++;
    }

    return stack.pop();
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
  let answerString = "abcdefghijk";
  if (filter() === false) {
    document.getElementById('inputBox').value = "";
    return;
  }

  console.log(choice1 + " " + choice2);
  if (expression != null) {
    let table = document.getElementById("table");
    let table2 = document.getElementById("table2");

    table.innerHTML = "";
    table2.innerHTML = "";
    let itof = new Conversion();
    table.style.display = "grid";
    table2.style.display = "none";

    if (choice1 == "Infix") {
      if (choice2 == "Postfix") {
        answerString = itof.infixToPostfix(expression, "post");
        tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Answer is = ${answerString}</td></tr>`
      }
      else if (choice2 == "Prefix") {
        expression = expression.replaceAll('(', '_');
        expression = expression.replaceAll(')', '(');
        expression = expression.replaceAll('_', ')');
        console.log(expression);
        answerString = itof.infixToPostfix(expression.split("").reverse().join(""), "pre");
        console.log(answerString);
        tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Answer is = ${answerString.split("").reverse().join("")}</td></tr>`
      }
      table.innerHTML = `<thead><tr><th>Input<br/>Symbol</th><th>Stack</th><th>Reverse Polish Expression</th><th>Rank</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;
    }
    else if (choice2 == "Infix") {
      if (choice1 == "Prefix") {
        console.log(expression);
        expression = expression.replaceAll('(', '_');
        expression = expression.replaceAll(')', '(');
        expression = expression.replaceAll('_', ')');
        answerString = itof.postfixToInfix(expression.split("").reverse().join(""), "pre");
      }
      else if (choice1 == "Postfix") {
        console.log(expression);
        answerString = itof.postfixToInfix(expression, "post");
      }
      tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Answer is = ${answerString}</td></tr>`
      table.innerHTML = `<thead><tr><th>Sr. No.</th><th>Input<br/>Symbol</th><th>Stack</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;
    }
    else if (choice1 == "Prefix" && choice2 == "Postfix") {
      console.log(expression);
      let infix = "", postfix = "";
      table2.style.display = "grid";

      console.log(table2);

      infix = itof.postfixToInfix(expression.split("").reverse().join(""), "pre");
      console.log(infix);
      tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Infix Expression = ${infix}</td></tr>`
      table.innerHTML += `<thead><tr><th style="width:100%">Prefix To Infix</th></tr><tr><th>Sr. No.</th><th>Input<br/>Symbol</th><th>Stack</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;

      tableBodyString = "";

      postfix = itof.infixToPostfix(infix, "post");
      console.log(postfix);

      tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Postfix Expression = ${postfix}</td></tr>`
      table2.innerHTML = `<thead><tr><th style="width:100%">Infix To Postfix</th></tr><tr><th>Input<br/>Symbol</th><th>Stack</th><th>Reverse Polish Expression</th><th>Rank</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;
      console.log(table);
      console.log(table2);
    }
    else if (choice1 == "Postfix" && choice2 == "Prefix") {
      console.log(expression);
      let infix = "", prefix = "";
      table2.style.display = "grid";

      console.log(table2);

      infix = itof.postfixToInfix(expression, "Post");
      console.log(infix);
      tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Infix Expression = ${infix}</td></tr>`
      table.innerHTML += `<thead><tr><th style="width:100%">Postfix To Infix</th></tr><tr><th>Sr. No.</th><th>Input<br/>Symbol</th><th>Stack</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;

      tableBodyString = "";

      infix = infix.replaceAll('(', '_');
      infix = infix.replaceAll(')', '(');
      infix = infix.replaceAll('_', ')');

      prefix = itof.infixToPostfix(infix.split("").reverse().join(""), "pre");
      console.log(prefix);

      tableBodyString += `<tr style="background-color:rgb(109, 129, 240);color:white;"><td colspan="4" style="width:100%;">Prefix Expression = ${prefix.split("").reverse().join("")}</td></tr>`
      table2.innerHTML = `<thead><tr><th style="width:100%">Infix To Prefix</th></tr><tr><th>Input<br/>Symbol</th><th>Stack</th><th>Reverse Polish Expression</th><th>Rank</th></tr></thead><tbody id="tbody">${tableBodyString}</tbody>`;
      console.log(table);
      console.log(table2);
    }
    tableBodyString = "";
  }
}
