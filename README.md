# PaginationAndPagerDemo

\- Angular 20 application (with [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1) + Bootstrap 5.

\- Pagination and Pager.

\- With tests.

## Application

A demo application to show pagination and pager components.

Add random persons to see the pagination and pager in action.

The application has a filter field to filter persons by name.

Sort by: firstname, lastname and age.

Show or hide the table columns.

See the root folder for example images.

## Installation + run app

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

**Command to run the tests:**

_npm run test_

To see the code coverage of the tests:

_npm run coverage_

When the command above is finished, the report is generated at: /coverage/index.html

### **Changelog:**

_August 2025_

\- Upgraded packages.

\- Removed **deprecated** package _@angular/animations_.

\- Installed _Vitest_ for tests. (removed _Karma_ which is **deprecated**).

\- Changes in speficication files (_toBeTrue_ to _toBeTruthy_, _toBeFalse_ to _toBeFalsy_, etc.).

\- More changes in speficication files (_spyOn_ to _vi.spyOn_).

\- Using fixture.componentRef.setInput() to test InputSignals and ModelSignals.

_June 2025_

\- Upgrade to Angular 20. 

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Removed unnecessary package _@angular/platform-browser-dynamic_

\- Various changes.

\- Suppressing deprecation warnings of _Bootstrap_ in _angular.json_ with the code:

`"stylePreprocessorOptions": {`  
`"sass": {`  
`"silenceDeprecations": ["mixed-decls", "color-functions", "global-builtin", "import"]`  
`}`  
`},`