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

## Delete my note

### Opens the delete confirmation modal

```gherkin
GIVEN I opened the page of a specific note
AND the note is available on the client
WHEN I click on the delete button
THEN I can see a delete confirmation modal for the note
```

- Components to test:
  - Note

### The delete confirmation modal disappears on cancel

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the cancle button
THEN I no longer see the delete confirmation modal
```

- Components to test:
  - Note

### Does not delete the note on cancel

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the cancel button
THEN the note is still stored in the database
AND I can see the note in the list of my notes
```

- Components to test:
  - Note

### The delete confirmation modal disappears on confirmation

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN I no longer see the delete confirmation modal
```

- Components to test:
  - Note

### Deletes the note on confirmation

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN I no longer see the note in the list of my notes
```

- Components to test:
  - Note

### Navigates to the notes page after confirming deletion

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN I get to the notes page
```

- Components to test:
  - Note

### Shows toast message on successfull deletion

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN the note is no longer stored in the database
AND I can see a successfully deleted toast message
```

The successfully deleted toast message should be: "Note permanently deleted."

- Components to test:
  - Note
