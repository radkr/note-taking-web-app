# Constraints

- For the "Test cases" section
  - Generate unit tests templates for specific components see the example below
    - into the folder of the component under test and
    - append to the file named in the format `<component>.test.js`
  - While testing use the jest, react testing library and use event packages
  - Generate a `describe` function for each second heading (like "# Browse all my notes") concatenated with the component name see the example below
  - Generate an `it` function for each third heading (like "## It shows empty message") see the example below
  - Generate the gherkin description into the `it` function as a comment see the example below

## Example

Let us assume that the testcase "It shows a note placeholder" would say the components to test is `AllNotes`:

- Search for the component in the `app` folder
- You will find that the tested component resides in the folder: `app/_components/all-notes`
- The file to which the implemented test code should be appended is `app/_components/all-notes/all-notes.test.js`

Generate the test functions according to the following example code if the component under test would be `Component`:

```javascript
describe("Component - Read my note", () => {
  it("shows a note placeholder", () => {
    /*
    GIVEN I have not created any notes yet
    AND the list of my notes is available on the client
    WHEN I read my note
    THEN I can see an empty placeholder where the note details should be
    */
    // Written by me later
  });
});
```

# Test cases

## Update my note

### Shows disabled save and cancel button

```gherkin
GIVEN the note is available on the client
WHEN I read my note
THEN I can see the disabled save button
AND I can see the disabled cancel button
```

- Components to test:
  - Note

### Shows enabled save and cancel button on title change

```gherkin
GIVEN the note is available on the client
WHEN I change the title of the note
THEN I can see the save button getting enabled
AND I can see the cancel button getting enabled
```

- Components to test:
  - Note

### Shows enabled save and cancel button on content change

```gherkin
GIVEN the note is available on the client
WHEN I change the content of the note
THEN I can see the save button getting enabled
AND I can see the cancel button getting enabled
```

- Components to test:
  - Note

### Disables the buttons on cancel after title change

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the cancel button
THEN I can see the save button getting disabled
AND I can see the cancel button getting disabled
```

- Components to test:
  - Note

### Reverts change in title

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the cancel button
THEN I can see the original title of the note again
```

- Components to test:
  - Note

### Disables the buttons on cancel after content change

```gherkin
GIVEN I have modified the content of the note without saving
WHEN I click on the cancel button
THEN I can see the save button getting disabled
AND I can see the cancel button getting disabled
```

- Components to test:
  - Note

### Reverts change in content

```gherkin
GIVEN I have modified the content of the note without saving
WHEN I click on the cancel button
THEN I can see the original content of the note again
```

- Components to test:
  - Note

### Disables the buttons on save after title change

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the save button
THEN I can see the save button getting disabled
AND I can see the cancel button getting disabled
```

- Components to test:
  - Note

### Saves the new title

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the save button
THEN the new title of the note is stored in the database
AND I can see a successfully saved toast message
```

The successfully saved toast message should be: "Note saved successfully!"

- Components to test:
  - Note

### Saves the new content

```gherkin
GIVEN I have modified the content of the note without saving
WHEN I click on the save button
THEN the new content of the note is stored in the database
AND I can see a successfully saved toast message
```

The successfully saved toast message should be: "Note saved successfully!"

- Components to test:
  - Note

### Shows the new title in the list of notes

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the save button
THEN I can see the new title in the list of my notes
```

- Components to test:
  - Note

### Shows the new title in the list of notes

```gherkin
GIVEN I have just saved my note with modified title
WHEN I browse the list of my notes
THEN I can see the new title in the list of my notes for the modified one
```

- Components to test:
  - Note

### Shows that the note was just updated in the note list

```gherkin
GIVEN I saved my note yesterday
AND I have just saved my note again
WHEN I browse the list of my notes
THEN I can see that the note was last edited today
```

- Components to test:
  - Note

### Shows that the note was just updated in the note details

```gherkin
GIVEN I saved my note yesterday
AND I have just saved my note again
WHEN I read my note
THEN I can see that the note was last edited today
```

- Components to test:
  - Note
