let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    showDeleteConfirmation()
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

function showDeleteConfirmation() {
    document.getElementById("delete-confirmation")
        .innerHTML = `
            Are you sure you want to delete saved data?
            <button id="delete-confirm-yes" class="yes-delete-btn">
            Yes
            </button>
            <button id="delete-confirm-no" class="no-delete-btn">
            No
            </button>    
        `
    
    document.getElementById("delete-confirm-yes")
        .addEventListener("click", function() {
            localStorage.clear()
            myLeads = []
            render(myLeads)
            hideDeleteConfirmation()
        })

    document.getElementById("delete-confirm-no")
        .addEventListener("click", function() {
            hideDeleteConfirmation()
        })
}

function hideDeleteConfirmation() {
    document.getElementById("delete-confirmation")
        .innerHTML = ''
}