# Constraints

- For the "Test cases" section
  - Generate unit tests for specific components see the example below
    - into the folder of the specific component and
    - the file named in the format `<component_name>.test.js`
    - create the file if it not yet exists
    - append the file if already exists
    - for the test code generation use the context of the given component
  - While testing use the jest, react testing library and use event packages
  - Generate a `describe` function for each second heading (like "# Browse all my notes") concatenated with the component name see the example below
  - Generate an `it` function for each third heading (like "## It shows empty message") see the example below
  - Generate the gherkin description into the `it` function as a comment see the example below
  - Mock any dependency you think necessary
    - Do not mock Tanstack query modules but the server actions implemented in the `_lib` folder instead
  - Generate manual mock files for modules if necessary

## Examples

The testcase "It indicates that the list of my notes is loading" says the components to test is `AllNotes`:

- The tested component resides in the folder `app/_components/all-notes` relative to the root folder
- The file the tets should be generated in is `app/_components/all-notes/all-notes.test.js`

Generate the test functions according to the following example code if the component under test for example is `Component`:

```javascript
describe("Component - Browse all my notes", () => {
  it("indicates that the list of my notes is loading", () => {
    /*
    GIVEN the list of my notes is not yet available on the client
    WHEN I browse the list of my notes
    THEN I can see a loading message
    */
    // Test implementation...
  });
});
```

# Test cases

## Browse all my notes

### It indicates that the list of my notes is loading

```gherkin
GIVEN the list of my notes is not yet available on the client
WHEN I browse the list of my notes
THEN I can see a loading message
```

The loading message should be: "Loading..."

- Components to test:
  - AllNotes

### It shows empty message

```gherkin
GIVEN I have not created any notes yet
AND the list of my notes is available on the client
WHEN I browse the list of my notes
THEN I can see an info message of not having any notes yet
```

The info message should be: "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."

- Components to test:
  - AllNotes

### It shows my notes

```gherkin
GIVEN I have created some notes already
AND the list of my notes is available on the client
WHEN I browse the list of my notes
THEN I can see all my notes in the list
```

- Components to test:
  - NotesPage

### It shows if the notes are untitled

```gherkin
GIVEN I have created some notes already
AND the list of my notes is available on the client
AND some notes do not have a title yet
WHEN I browse the list of my notes
THEN I can read "Untitled note" in the place of the title on the notes without one
```

- Components to test:
  - AllNotesItem

### It shows the title of the notes

```gherkin
GIVEN I have created some notes already
AND the list of my notes is available on the client
AND some of the notes have a title
WHEN I browse the list of my notes
THEN I can see the title of each note that has one
```

- Components to test:
  - AllNotesItem

### It shows when was a note last edited

```gherkin
GIVEN I have created some notes already
AND the list of my notes is available on the client
WHEN I browse the list of my notes
THEN I can see when were the notes last edited
```

- Components to test:
  - AllNotesItem
