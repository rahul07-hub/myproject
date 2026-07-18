Feature: Complete Employee Management System - All Pages

  # ==================== LOGIN ====================
  Scenario: SC01 - Login to the application
    Given the user opens the application
    When the user logs in with valid credentials
    Then the user should be on the Dashboard

  # ==================== DASHBOARD ====================
  Scenario: SC02 - Verify Dashboard loads
    Given the user is logged in
    When the user navigates to Dashboard
    Then the Dashboard page should be displayed
    And the Dashboard should show metric cards

  Scenario: SC03 - Verify Dashboard metric cards
    Given the user is on the Dashboard page
    Then Total Employees card should be visible
    And Active Employees card should be visible
    And Departments card should be visible
    And Monthly Salary card should be visible

  # ==================== EMPLOYEES ====================
  Scenario: SC04 - Open Employee List page
    Given the user is logged in
    When the user navigates to Employees page
    Then the Employee List page should load successfully

  Scenario: SC05 - Verify Employee List has records
    Given the user is on the Employees page
    Then the employee table should have at least one record

  Scenario: SC06 - Search an existing employee
    Given the user is on the Employees page
    When the user searches for employee "Rahul"
    Then the employee "Rahul" should appear in the table

  Scenario: SC07 - Add a new employee
    Given the user is on the Employees page
    When the user navigates to Add Employee page
    And the user fills the Add Employee form with:
      | name       | BDD Tester              |
      | email      | bdd.tester@company.com  |
      | phone      | +91 98765 43210         |
      | location   | Mumbai                  |
      | department | Engineering             |
      | role       | QA Engineer             |
      | manager    | Rahul                   |
      | salary     | 750000                  |
      | skills     | Selenium, Cucumber, BDD |
    And the user submits the Add Employee form

  Scenario: SC08 - Verify the new employee is added
    Given the user is on the Employees page
    When the user searches for employee "BDD Tester"
    Then the employee "BDD Tester" should appear in the table

  Scenario: SC09 - Edit an employee
    Given the user is on the Employees page
    When the user searches for employee "BDD Tester"
    And the user clicks Edit on the first matching employee
    And the user closes the edit modal

  Scenario: SC10 - Verify employee still exists after edit
    Given the user is on the Employees page
    When the user searches for employee "BDD Tester"
    Then the employee "BDD Tester" should appear in the table

  Scenario: SC11 - Delete the test employee
    Given the user is on the Employees page
    When the user searches for employee "BDD Tester"
    And the user clicks Delete on the first matching employee
    And the user confirms the delete dialog

  Scenario: SC12 - Verify employee is deleted
    Given the user is on the Employees page
    When the user searches for employee "BDD Tester"
    Then the employee "BDD Tester" should not appear in the table

  # ==================== DEPARTMENTS ====================
  Scenario: SC13 - Open Departments page
    Given the user is logged in
    When the user navigates to Departments page
    Then the Departments page should load successfully

  Scenario: SC14 - Verify Department metrics are visible
    Given the user is on the Departments page
    Then the Total Departments metric should be visible

  Scenario: SC15 - Verify Department cards are displayed
    Given the user is on the Departments page
    Then at least one department card should be displayed

  # ==================== ATTENDANCE ====================
  Scenario: SC16 - Open Attendance page
    Given the user is logged in
    When the user navigates to Attendance page
    Then the Attendance page should load successfully

  Scenario: SC17 - Verify Attendance metrics are visible
    Given the user is on the Attendance page
    Then the Present metric should be visible
    And the Absent metric should be visible
    And the Late metric should be visible

  Scenario: SC18 - Verify Attendance Daily Log is displayed
    Given the user is on the Attendance page
    Then the Daily Log section should be visible

  # ==================== PAYROLL ====================
  Scenario: SC19 - Open Payroll page
    Given the user is logged in
    When the user navigates to Payroll page
    Then the Payroll page should load successfully

  Scenario: SC20 - Verify Payroll metrics are visible
    Given the user is on the Payroll page
    Then the Total Payroll metric should be visible

  Scenario: SC21 - Verify Payroll table has records
    Given the user is on the Payroll page
    Then the payroll table should have at least one record

  # ==================== REPORTS ====================
  Scenario: SC22 - Open Reports page
    Given the user is logged in
    When the user navigates to Reports page
    Then the Reports page should load successfully

  Scenario: SC23 - Verify Reports charts are visible
    Given the user is on the Reports page
    Then the reports charts should be visible

  # ==================== SETTINGS ====================
  Scenario: SC24 - Open Settings page
    Given the user is logged in
    When the user navigates to Settings page
    Then the Settings page should load successfully

  Scenario: SC25 - Verify Settings profile section is visible
    Given the user is on the Settings page
    Then the profile section should be visible

  # ==================== LOGOUT ====================
  Scenario: SC26 - Logout from the application
    Given the user is logged in
    When the user clicks the logout button
    Then the user should be redirected to the Login page
