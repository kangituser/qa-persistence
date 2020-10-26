# **QA-Tests Persistence**

## **About**

```haskell
This service is for storing QA test results.

The service is solely for the purpose of integrating with another python service which sits on the local machine of the QA tester (using PyCharm & Selenium).

[1] - data gets stored to the database (hosted on your local machine). in our case it's a Postgresql database.

[2]- data is stored in a specific board on 'Monday.com'. the data here is meant to reflect the up-to-date sate of tests rather that reflecting the histoy.
```

## **How to use**

```css
npm install
```

```css
npm run start
```

## **Eample Request Body**

```json
all values should be strings.

{
  "ID": "1.1.1.1.1",
  "module": "database",
  "system": "tarffic",
  "screen": "back office",
  "component": "media",
  "field_desc": "adding media to back office",
  "test_desc": "pressing a button and adding media (i.e. twitter).",
  "desired_result": "a new media should be added with the selected name",
  "project": "KLH",
  "status": "passed",
  "group": "STP - Test Scenarios"
}

```

```yaml
  about the body:

    - ID: the test id.
    - module: the module being tested.
    - system: the system being tested.
    - screen: the screen being tested.
    - component: the component being tested.
    - field_desc: the field description.
    - test_desc: the test description.
    - desired_result: the desired result description.
    - project: the project name.
    - status: the stats of the test ("passed", "failed").
    - group: the group name.

```
