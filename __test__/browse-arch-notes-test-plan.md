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

## Browse my archived notes

### Opens my archived note list

```gherkin
GIVEN I opened the notes page
WHEN I click on the archived notes button
THEN I get to the archived notes page
```

- Components to test:
  - BottomNavigation
  - DesktopNavigation

### Opens my archived note list

```gherkin
GIVEN I opened the archived notes page
WHEN I click on the home button
THEN I get to the notes page
```

- Components to test:
  - BottomNavigation
  - DesktopNavigation

### Shows the Archived Notes title

```gherkin
GIVEN I opened the archived notes page
WHEN I look at the page
THEN I can see the "Archived Notes" title
```

- Components to test:
  - DesktopPageHeader
  - AllNotesHeader

### Shows some hints about archived notes

```gherkin
GIVEN I opened the archived notes page
WHEN I look at the page
THEN I can see some hints about archived notes
```

- Components to test:
  - AllNotes

### Indicates that the list of my archived notes is loading

```gherkin
GIVEN the list of my archived notes is not yet available on the client
WHEN I browse the list of my archived notes
THEN I can see a loading message
```

- Components to test:
  - AllNotes

The loading message should be: "Loading..."

### Shows empty message

```gherkin
GIVEN I have not archived any notes yet
AND the list of my archived notes is available on the client
WHEN I browse the list of my archived notes
THEN I can see an info message of not having any notes yet
```

- Components to test:
  - AllNotes

The info message should be: "No notes have been archived yet. Move notes here for safekeeping, or create a new note."

### Shows my archived notes

```gherkin
GIVEN I have archived some notes already
AND the list of my notes is available on the client
WHEN I browse the list of my archived notes
THEN I can see all my archived notes in the list
```

- Components to test:
  - NotesPage

## Read my note

### It shows the note status

```gherkin
GIVEN the archived note is available on the client
WHEN I read my archived note
THEN I can see that the status of my note is archived
```

- Components to test:
  - Note
