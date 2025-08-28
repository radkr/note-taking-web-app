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

## Browse my notes with a specific tag

### Opens the notes page filtered to a tag

```gherkin
GIVEN I created some tags already
And I opened the tags page
WHEN I click on one of my tags
THEN I get to the notes page filtered to a tag
```

- Components to test:
  - AllTags

### Shows the Tagged Notes title

```gherkin
GIVEN I opened the tagged notes page for a specific tag
WHEN I look at the page
THEN I can see the "Notes Tagged:..." title for that spacific tag
```

- Components to test:
  - AllNotesHeader

### Shows hint about for what specific tag showing results currently - on portable

```gherkin
GIVEN I opened the tagged notes page for a specific tag
WHEN I look at the page
THEN I can see a hint about for what specific tag showing results currently
```

- Components to test:
  - AllNotesHeader
