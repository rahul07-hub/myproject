package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.datatable.DataTable;
import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import pages.EmployeePage;
import pages.LogoutPage;
import utils.DriverFactory;
import utils.WaitUtility;
import java.time.Duration;
import java.util.Map;

public class EmployeeSteps {

    private final WebDriver driver = DriverFactory.getDriver();
    private final WaitUtility wait = new WaitUtility(driver);
    private final EmployeePage employeePage = new EmployeePage(driver, wait);
    private final LogoutPage logoutPage = new LogoutPage(driver, wait);

    @Given("the user is on the Dashboard page")
    public void the_user_is_on_the_dashboard_page() {
        Assert.assertTrue(driver.getCurrentUrl().endsWith("/") || driver.getCurrentUrl().contains("/dashboard") || driver.getCurrentUrl().contains("localhost"),
                "User should be on Dashboard page. Current URL: " + driver.getCurrentUrl());
    }

    @When("the user navigates to the Employees page")
    public void the_user_navigates_to_the_employees_page() {
        employeePage.navigateToEmployees();
    }

    @Then("the Employee page should load successfully")
    public void the_employee_page_should_load_successfully() {
        Assert.assertTrue(employeePage.isEmployeePageLoaded(), "Employee page heading should load");
    }

    @Given("the user is on the Employees page")
    public void the_user_is_on_the_employees_page() {
        if (!employeePage.isEmployeePageLoaded()) {
            employeePage.navigateToEmployees();
        }
        Assert.assertTrue(employeePage.isEmployeePageLoaded(), "User must be on Employees page");
    }

    @Then("the Employee list should be displayed with at least one record")
    public void the_employee_list_should_be_displayed_with_at_least_one_record() {
        Assert.assertTrue(employeePage.getVisibleEmployeeCount() > 0, "Employee list should not be empty");
    }

    @When("the user searches for employee {string}")
    public void the_user_searches_for_employee(String name) {
        employeePage.searchEmployee(name);
        wait.pause(1000); // wait for search API filtering
    }

    @Then("the employee {string} should be displayed in the list")
    public void the_employee_should_be_displayed_in_the_list(String name) {
        Assert.assertTrue(employeePage.isEmployeeInList(name), "Employee " + name + " should be in the list");
    }

    @When("the user navigates to Add Employee page")
    public void the_user_navigates_to_add_employee_page() {
        employeePage.navigateToAddEmployee();
    }

    @When("the user fills the Add Employee form with:")
    public void the_user_fills_the_add_employee_form_with(DataTable dataTable) {
        Map<String, String> data = dataTable.asMap(String.class, String.class);
        employeePage.fillAddEmployeeForm(
                data.get("name"),
                data.get("email"),
                data.get("phone"),
                data.get("location"),
                data.get("department"),
                data.get("role"),
                data.get("manager"),
                data.get("salary"),
                data.get("skills")
        );
    }

    @When("the user submits the Add Employee form")
    public void the_user_submits_the_add_employee_form() {
        employeePage.submitAddEmployee();
    }

    @When("the user clicks Edit on the first employee matching {string}")
    public void the_user_clicks_edit_on_the_first_employee_matching(String name) {
        employeePage.clearSearch();
        wait.pause(800);
        employeePage.searchEmployee(name);
        wait.pause(800);
        employeePage.clickEditFirstEmployee();
    }

    @When("the user closes the edit modal")
    public void the_user_closes_the_edit_modal() {
        employeePage.closeEditModal();
    }

    @Then("the employee {string} should still be visible in the list")
    public void the_employee_should_still_be_visible_in_the_list(String name) {
        employeePage.clearSearch();
        wait.pause(800);
        employeePage.searchEmployee(name);
        Assert.assertTrue(employeePage.isEmployeeInList(name), "Employee " + name + " should still be visible in list");
    }

    @When("the user clicks Delete on the first employee matching {string}")
    public void the_user_clicks_delete_on_the_first_employee_matching(String name) {
        employeePage.clickDeleteFirstEmployee();
    }

    @When("the user accepts the confirmation alert")
    public void the_user_accepts_the_confirmation_alert() {
        try {
            WebDriverWait alertWait = new WebDriverWait(driver, Duration.ofSeconds(4));
            Alert alert = alertWait.until(ExpectedConditions.alertIsPresent());
            alert.accept();
            wait.pause(1000);
        } catch (Exception e) {
            // No alert found
        }
    }

    @Then("the employee {string} should not be displayed in the list")
    public void the_employee_should_not_be_displayed_in_the_list(String name) {
        Assert.assertFalse(employeePage.isEmployeeInList(name), "Employee " + name + " should not be displayed in the list");
        employeePage.clearSearch();
    }

    @When("the user clicks the logout button")
    public void the_user_clicks_the_logout_button() {
        logoutPage.clickLogout();
    }

    @Then("the user should be redirected to the Login page")
    public void the_user_should_be_redirected_to_the_login_page() {
        Assert.assertTrue(logoutPage.isRedirectedToLoginPage(), "User should be redirected to Login page");
    }
}
