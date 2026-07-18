Feature: Employee Management Functionality

  Scenario: Scenario 1 - Open Employee Page
    Given the user is on the Dashboard page
    When the user navigates to the Employees page
    Then the Employee page should load successfully

  Scenario: Scenario 2 - Verify Employee List is displayed
    Given the user is on the Employees page
    Then the Employee list should be displayed with at least one record

  Scenario: Scenario 3 - Search Employee
    Given the user is on the Employees page
    When the user searches for employee "Rahul"
    Then the employee "Rahul" should be displayed in the list

  Scenario: Scenario 4 - Add Employee
    Given the user is on the Employees page
    When the user navigates to Add Employee page
    And the user fills the Add Employee form with:
      | name        | Amit Sharma             |
      | email       | amit.sharma@company.com |
      | phone       | +91 99999 88888         |
      | location    | New Delhi               |
      | department   | Engineering             |
      | role        | Software Engineer       |
      | manager     | Rahul                   |
      | salary      | 1000000                 |
      | skills      | Java, Selenium, Testing |
    And the user submits the Add Employee form

  Scenario: Scenario 5 - Verify Employee Added
    Given the user is on the Employees page
    When the user searches for employee "Amit Sharma"
    Then the employee "Amit Sharma" should be displayed in the list

  Scenario: Scenario 6 - Edit Employee
    Given the user is on the Employees page
    When the user clicks Edit on the first employee matching "Amit Sharma"
    And the user closes the edit modal

  Scenario: Scenario 7 - Verify Employee Updated
    Given the user is on the Employees page
    Then the employee "Amit Sharma" should still be visible in the list

  Scenario: Scenario 8 - Delete Employee
    Given the user is on the Employees page
    When the user searches for employee "Amit Sharma"
    And the user clicks Delete on the first employee matching "Amit Sharma"
    And the user accepts the confirmation alert

  Scenario: Scenario 9 - Verify Employee Deleted
    Given the user is on the Employees page
    When the user searches for employee "Amit Sharma"
    Then the employee "Amit Sharma" should not be displayed in the list

  Scenario: Scenario 10 - Logout
    Given the user is on the Employees page
    When the user clicks the logout button
    Then the user should be redirected to the Login page
