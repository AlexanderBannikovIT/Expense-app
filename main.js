// Создаю массив траты для дальнейшей работы с ним
let Expenses = [];

// Объявляю остальные DOM элементы

const ExpensesInputNode = document.getElementById("Expenses-Input_JS");
const AddExpensesButton = document.getElementById("AddButton_JS");
const LimitNode = document.getElementById("LimitValue");
const TotalNode = document.getElementById("TotalValue");
const StatusNode = document.getElementById("StatusText");
const HistoryNode = document.getElementById("HistoryList")
const RemoveButton = document.getElementById("RemoveButton");
const CategoryNode = document.getElementById("CategoryList");
const LimitChangeButton = document.getElementById("LimitChangeButton");

const CHANGE_LIMIT_TEXT = "Новый лимит"
const STATUS_IN_LIMIT = "Всё хорошо"
const STATUS_OUT_OF_LIMIT = "Всё плохо"

let limit = parseInt(LimitNode.innerText)

LimitNode.innerText = localStorage.getItem('limit');


function GetTotalUser(){
    sum = 0;
    Expenses.forEach(expense =>{
        sum+=expense.amount;
    })

    return sum
}

function RenderStatus(){
    const total = GetTotalUser(Expenses);
    TotalNode.innerText = total;
    if (total <= limit) {
        StatusNode.innerText = `${STATUS_IN_LIMIT}`;
        StatusNode.className = "good_total";
    }
    else {
        StatusNode.innerText = `${STATUS_OUT_OF_LIMIT} (-${total-limit})`;
        StatusNode.className = "bad_total currency";
    }
}

function AllRender(){
    RenderStatus();
    RenderHistory();
}

function RenderHistory(){
    HistoryNode.innerHTML = "";
    Expenses.forEach(expense => {
    const ExpenseItem = document.createElement("li");
        ExpenseItem.className="currency";
        ExpenseItem.innerText = `${expense.category} - ${expense.amount}`;

        HistoryNode.appendChild(ExpenseItem);
    });

}

const GetExpensesFromUser = () => parseInt(ExpensesInputNode.value);
const GetCategoryFromUser = () => (CategoryNode.value);
const ClearInput = () => {
    ExpensesInputNode.value = ""; 
};


function AddButtonHandler(){
    const CurrentExpense = GetExpensesFromUser();
    if (!CurrentExpense) {
        return
    };

    const CurrentCategory = GetCategoryFromUser();
    if (CurrentCategory === 'Категория') {
        return
    };
    
    const NewExpenses = {amount:CurrentExpense, category:CurrentCategory};

    Expenses.push(NewExpenses);
    console.log(NewExpenses);

    AllRender();
    ClearInput();
}

function ChangeLimit(){
    NewLimit = prompt(CHANGE_LIMIT_TEXT);
    if (!NewLimit) {
        return
    }
    limit = parseInt(NewLimit);

    LimitNode.innerText = limit;

    localStorage.getItem("limit",limit);
    AllRender();
}



AddExpensesButton.addEventListener("click",function(){
    AddButtonHandler()
    
});
RemoveButton.addEventListener("click", function(){
    Expenses = [];

    AllRender();
});

LimitChangeButton.addEventListener("click", ChangeLimit);



