# Private Money Laundry List

_For review & will be basis of new roadmap_

## Already Done

1. Current application is fully usable for importing, categorizing & exporting transactions
2. Extensible rules engine
3. Import & Export
4. User can create & edit categorization rules
5. Transactions that will be affected by create / edit rule are displayed.
6. Transaction table (display) with:
   - a variety of filters.
7. REST API for all current functionality
8. Wrappers around MongoDB native driver functions which make db queries easier to write.

## Enhancements

### User Authentication

**Current:** There is no authentication. The app is intended to be used with client and server running on local machine and data locally or in MongoDB Atlas.

**New:** Implement authentication.

---

### UX / Workflow

**Current:** UI works well for klequis.

**New:** Get feedback from other people and make improvements as needed.

---

### UI Design - Look & Feel

**Current:** Little attention has been given to how the application looks.

**New:**

- A color scheme that leaves the user feeling a little happier. (It is currently too dark & moody).
- Better & consistant spacing.

---

### Categories

**Current:** Categories are typed in. There is no list of existing categories.

**New:**

- User defined list of categories.
- 2 level hierarchical as currently expressed in the UI.
- List management UI.
- Category1 & Category2 in create/edit rule will desplay values from list.

---

### Transaction Duplicate Resolution

**Current:** Functionality to find and return potential duplicates is already implemented on the server.

**New:** UI to present and allow resolution of duplicates.

---

### Import > Select Dialog

**Current:** The user must put the data files (.csv) in the server/data directory & then run import by inputting a url in the browser's address bar.

**New:** Create a UI to select files with data to import & an Import button for the user to click on.

---

### Import > Incremental Import

**Current:** The set of files to import from must contain all transaction history for all accounts. Import wipes all transaction data currently in the database, replaces with new from files and re-runs rules.

**New:** Import will examine each file the user chooses to import and:

- identify and import only new transactions.
- produce a conflict / duplicate report if any are found.

---

### Import > Status/Result Report

When import completes a page will be displayed to the user with the following for each account:

- account id
- number of transactions before import
- number of transactions imported
- new total number of transactions
- any problems encountered.

---

### Import > Import Amazon History File

**Current:** Amazon purchases show on credit-card statements which do not show what was purchased.

**New:** A purchase history report can be downloaded from Amazon. This file is significanly different from all other accounts. An additional dedicated import routine may be needed. The current structure of accounts should be able to accomodate Amazon history.

---

### Rules > Rule Conflicts

**Current:** The current UI for rule conflicts is in CriteriaResults. It shows which rules will be overwritten by the new or existing rule currently being edited/created by the user. The information show is not sufficient to make a 100% certain decision.

**New:** Improve the UI to enable the user to make a more informed decision.

---

### Rules > Additional Criteria Operators

**Current:** Criteria are focused on text (beginsWith, contains, etc). Only _equals_ works with numbers and is doing a string comparison, not a number comparison.

**New:**

1. Add operators:

- greater than (>)
- less than (<)
- less than or equal to (<=)
- greater than or equal to (>=)
- does not equal (<>)

2. UI should use existing information of data type and present an appropriate sub-list of all operators.

---

### Transactions Table > Virtual Window

**Current:** All transactions in the db are loaded at the same time and the UI gets very slow with 1,000 transactions or more. Current test set is 2230 transactions and is usable but annoyingly slow. It has been confirmed that the slowness is cause by browser rendering the large table.

**New:** Implement a virtual window solution.

---

### Account creation & Column Mapping

**Current:** Accounts and column maps must be typed into MongoDB.

**New:** A UI/form for creating an account with colum mappings.

---

### Setup

**Current:** Setting-up the app is not difficult for a developer but could not be done by a non-developer.

**New:** Automate

- db creation locally & on MongoDB Atlas.
- Instance of client & server that can serve multiple users.
- Deployment of client and server to dedicated location on user's behalf.
- Option to run client & server locally.

> Question: If the user wanted to keep their data private what is required. E.g.,
>
> - Have Private Money create and manage a MongoDB for them with encrypted data only the user can see (ala Signal), OR
> - Create for the user their own MonoDB Atlas account that the developers/managers of Private Money have no knowledge of.

---

# Other possible goals

1. Option to use Plaid API for data retrieval.
2. A mobile version. Klequis would never use the app on his phone or other mobile device, so didn't design for it.
3. Reporting: Currently, the app exports categorized transactions to .csv which can then be manipulated in Excel. This works for me, but there are a number (likely > 5 and < 10) reports that a user would want to have. The queries for these reports are not difficult and can be added to the API. Charts can be created using a visualtion tool such as D3.
