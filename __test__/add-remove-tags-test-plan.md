# Constraints

- For the "Test cases" section
  - Generate unit tests for specific components see the example below
    - into the folder of the component under test and
    - append to the file named in the format `<component>.test.js`
    - for the test code generation analyze the code of the component that resides in the file `<component>.js`
    - during the analyzis determine the dependencies that should be mocked and the props that should be set for the test
      - do not mock Tanstack query modules or the hooks resides in the files in the `_lib/notes/hooks` folder but the server actions instead that are called by those hooks and are implemented in the `_lib/notes/all-notes-actions.js` file
  - While testing use the jest, react testing library and use event packages
  - Generate a `describe` function for each second heading (like "# Browse all my notes") concatenated with the component name see the example below
  - Generate an `it` function for each third heading (like "## It shows empty message") see the example below
  - Generate the gherkin description into the `it` function as a comment see the example below

## Example

Let us assume that the testcase "It shows a note placeholder" would say the components to test is `AllNotes`:

- Search for the component in the `app` folder
- You will find that the tested component resides in the folder: `app/_components/all-notes`
- The file to which the implemented test code should be appended is `app/_components/all-notes/all-notes.test.js`
-

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
    // Test implementation...
  });
});
```

# Test cases

## Add or remove tags to or from my note

### It shows the note tags

```gherkin
GIVEN the note is available on the client
AND the note has some tags
WHEN I read my note
THEN I can see all tags of the note
```

- Components to test:
  - Note

### Adds a tag to the note

```gherkin
GIVEN the note is available on the client
WHEN I add a new tag to the note
THEN I can see the new tag amongst the note's tags
AND the note is updated in the database with the new tag
AND I can see a successfully added toast message
```

- Components to test:
  - NotesPage

### Does not add an already added tag to the note

```gherkin
GIVEN the note is available on the client
AND the note has some tags
WHEN I add a tag to the note that has been added already
THEN I can see the tag amongst the note's tags only once
AND I can see an already added toast message
```

- Components to test:
  - NotesPage

### Shows an error toast message on fail to add a new tag

```gherkin
GIVEN the note is available on the client
WHEN I add a new tag to the note
AND the note fails to be updated in the database with the new tag
THEN I can see a tag failed to add toast message
```

- Components to test:
  - NotesPage

### Removes a tag from the note

```gherkin
GIVEN the note is available on the client
AND the note has some tags
WHEN I remove a tag from the note
THEN I no longer see the removed tag among the note's tags
AND the tag is removed from the note in the database
```

- Components to test:
  - NotesPage

### Shows an error toast message on fail to remove a tag

```gherkin
GIVEN the note is available on the client
WHEN I add a new tag to the note
AND the note fails to be updated in the database with the new tag
THEN I can see a tag failed to add toast message
```

- Components to test:
  - NotesPage
