document.addEventListener("DOMContentLoaded", () => {
    // Select all tab elements and content sections
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".box");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginSection = document.getElementById("login-section");
    const adminSection = document.getElementById("admin-section");
    const menuIcon = document.getElementById("menuicn");
    const navContainer = document.querySelector(".navcontainer");
    let currentPassword = "password";
    
    // Handle tab switching
    const handleTabClick = (e) => {
        const target = e.currentTarget.getAttribute("data-target");
        
        sections.forEach(section => section.style.display = "none");
        tabs.forEach(tab => tab.classList.remove("active"));
        
        document.getElementById(target).style.display = "block";
        e.currentTarget.classList.add("active");
    };
    
    tabs.forEach(tab => tab.addEventListener("click", handleTabClick));
    
    // Show default tab
    document.getElementById("dashboard-section").style.display = "block";
    
    // Handle login
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;
        
        if (username === "admin" && password === currentPassword) {
            loginSection.classList.add("hidden");
            adminSection.classList.remove("hidden");
            document.getElementById("dashboard-section").style.display = "block";
            document.querySelector(".tab[data-target='dashboard-section']").classList.add("active");
        } else {
            alert("Invalid username or password.");
        }
    });
    
    // Handle logout
    logoutBtn.addEventListener("click", () => {
        adminSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
        document.getElementById("admin-username").value = "";
        document.getElementById("admin-password").value = "";
        sections.forEach(section => section.style.display = "none");
        tabs.forEach(tab => tab.classList.remove("active"));
    });
    
    // Handle password change
    const passwordForm = document.getElementById("password-change-form");
    if (passwordForm) {
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            currentPassword = document.getElementById("new-password").value;
            alert("Password changed successfully!");
            passwordForm.reset();
        });
    }
    
    // Handle student data summary
    const studentTable = document.querySelector("#student-table tbody");
    if (studentTable) {
        const rows = studentTable.getElementsByTagName("tr");
        document.getElementById("total-students").textContent = rows.length;
        if (rows.length > 0) {
            let lastRow = rows[rows.length - 1];
            document.getElementById("last-student").textContent = lastRow.cells[1].textContent + " " + lastRow.cells[2].textContent;
            document.getElementById("last-date").textContent = lastRow.cells[7].textContent;
        }
    }
    
    // Handle menu toggle for small screens
    if (menuIcon && navContainer) {
        menuIcon.addEventListener("click", () => {
            navContainer.classList.toggle("active");
        });
    }

    // API URLs
    const API_URLS = {
        register: "https://rebite.onrender.com/api/users/register",
        login: "https://rebite.onrender.com/api/users/login",
        partners: "https://rebite.onrender.com/api/partners",
        courses: "https://rebite.onrender.com/api/courses",
        products: "https://rebite.onrender.com/api/products",
    };
    
    // Utility to display errors
    const displayError = (message) => {
        const errorElement = document.getElementById("error-display");
        if (errorElement) {
            errorElement.innerText = message;
            errorElement.style.display = "block";
        } else {
            alert(message);
        }
    };
    
    // Utility to hide errors
    const hideError = () => {
        const errorElement = document.getElementById("error-display");
        if (errorElement) {
            errorElement.style.display = "none";
        }
    };
    
    // Fetch and display data
    const fetchData = async (url, method = "GET", data = null) => {
        try {
            const options = {
                method,
                headers: { "Content-Type": "application/json" },
            };
            if (data) options.body = JSON.stringify(data);
            
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            displayError(error.message);
            throw error;
        }
    };
    
    // Handle form submissions
    const handleFormSubmit = (formId, url, onSuccess) => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            hideError();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const result = await fetchData(url, "POST", data);
                alert("Success!");
                if (onSuccess) onSuccess(result);
            } catch (error) {
                console.error(error);
            }
        });
    };
    
    // Initialize the app
    handleFormSubmit("partners-form", API_URLS.partners, (result) => console.log("Partner added:", result));
    handleFormSubmit("courses-form", API_URLS.courses, (result) => console.log("Course added:", result));
    handleFormSubmit("products-form", API_URLS.products, (result) => console.log("Product added:", result));
});
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const studentTable = document.getElementById("student-table");

    if (searchInput && studentTable) {
        searchInput.addEventListener("keyup", function () {
            const filter = searchInput.value.toLowerCase();
            const rows = studentTable.getElementsByTagName("tr");

            for (let i = 1; i < rows.length; i++) { // Start from 1 to skip table headers
                let rowText = rows[i].innerText.toLowerCase();
                
                if (rowText.includes(filter)) {
                    rows[i].style.display = ""; // Show matching rows
                } else {
                    rows[i].style.display = "none"; // Hide non-matching rows
                }
            }
        });
    }
});
