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

## Read my note

### It shows a note placeholder

```gherkin
GIVEN I have not created any notes yet
AND the list of my notes is available on the client
WHEN I read my note
THEN I can see an empty placeholder where the note details should be
```

- Components to test:
  - NotesPage

### It highlights the first note as opened

```gherkin
GIVEN I have created some notes already
AND I opened the notes page
AND the list of my notes is available on the client
WHEN I browse the list of my notes
THEN I can see that the first one of my notes in the list is opened
```

Note for "I can see that the first one of my notes in the list is opened":

- The visual effect caused the `selected` css class added to the opened note item

- Components to test:
  - NotesPage

### It shows the details of the first note

```gherkin
GIVEN I have created some notes already
AND I opened the notes page
AND the list of my notes is available on the client
AND the first one of my notes is available on the client
WHEN I read my note
THEN I can see the details of the first one of my notes in the list
```

- Components to test:
  - NotesPage

### It highlights the opened note

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
WHEN I browse the list of my notes
THEN I can see that the specific note is opened
```

- Components to test:
  - NotesPage

### It shows the opened note

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
AND the note is available on the client
WHEN I read my note
THEN I can see the details of that specific note
```

- Components to test:
  - NotesPage

### It indicates that the note is loading

```gherkin
GIVEN the note is not yet available on the client
WHEN I read my note
THEN I can see a loading message
```

- Components to test:
  - Note

The loading message should be: "Loading..."

### It shows the note title placeholder

```gherkin
GIVEN the note is available on the client
AND the note does not have a title yet
WHEN I read my note
THEN I can see a placeholder text where the title of the note should be
```

The placeholder text should be: "Enter a title..."

- Components to test:
  - Note

### It shows the note title

```gherkin
GIVEN the note is available on the client
AND the note has a title
WHEN I read my note
THEN I can see the title of the note
```

- Components to test:
  - Note

### It shows the note content placeholder

```gherkin
GIVEN the note is available on the client
AND the note does not have any content yet
WHEN I read my note
THEN I can see a placeholder text where the content of the note should be
```

The placeholder text should be: "Start typing you note here..."

- Components to test:
  - Note

### It shows the note content

```gherkin
GIVEN the note is available on the client
AND the note has some content
WHEN I read my note
THEN I can see the content of the note
```

- Components to test:
  - Note

### It shows when was the note last edited

```gherkin
GIVEN the note is available on the client
WHEN I read my note
THEN I can see when was the note last edited
```

- Components to test:
  - Note

### It shows error message when the note does not exists

```gherkin
GIVEN I opened the page of a specific note
AND the note does not exist in the database
WHEN I read my note
THEN I can see a "couldn't find" error message
```

The "couldn't find" error message should be: "We couldn’t find this note — it may have been deleted, or you might not have permission to view it. Try opening a different note, or log in with a different account."

- Components to test:
  - Note

### It shows error message when user is not permitted to view the note

```gherkin
GIVEN I opened the page of a specific note
AND the user is not permitted to view the note
WHEN I read my note
THEN I can see a "couldn't find" error message
```

The "couldn't find" error message should be: "We couldn’t find this note — it may have been deleted, or you might not have permission to view it. Try opening a different note, or log in with a different account."

- Components to test:
  - Note

### It opens the login page when clicking on "log in with a different account"

```gherkin
GIVEN I opened the page of a specific note
AND I can see a "couldn't find" error message
WHEN I click on "log in with a different account"
THEN I get to the login page
```

- Components to test:
  - Note

### It opens my note

```gherkin
GIVEN I have created some notes already
AND I opened the notes page
AND the list of my notes is available on the client
WHEN I click on one of my note in the list
THEN I get to the page of that specific note
```

- Components to test:
  - NotesPage

### It opens my other note

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
AND the list of my notes is available on the client
WHEN I select one of my note in the list
THEN I get to the page of that specific note
```

- Components to test:
  - NotesPage

### It opens my note list

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
WHEN I click on the home button
THEN I get to the notes page
```

- Components to test:
  - DesktopNavigation
  - BottomNavigation
