# Constraints

- For the "Test cases" section
  - Write unit tests for specific components
  - While testing use the jest, react testing library and use event packages
  - Generate a `describe` function for each second heading (like "# Browse all my notes") see the example below
  - Generate an `it` function for each third heading (like "## It shows empty message") see the example below
  - Generate the gherkin description into the `it` function as a comment see the example below
  - Mock any dependency you think necessary
    - Do not mock Tanstack query modules but the server actions implemented in the `_lib` folder instead
  - Generate manual mock files for modules if necessary

## Example

```javascript
describe("Browse all my notes", () => {
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

## Read my note

### It shows a note placeholder

```gherkin
GIVEN I have not created any notes yet
AND the list of my notes is available on the client
WHEN I read my note
THEN I can see an empty placeholder where the note details should be
```

### It highlights the first note as opened

```gherkin
GIVEN I have created some notes already
AND I opened the notes page
AND the list of my notes is available on the client
WHEN I browse the list of my notes
THEN I can see that the first one of my notes in the list is opened
```

### It shows the details of the first note

```gherkin
GIVEN I have created some notes already
AND I opened the notes page
AND the list of my notes is available on the client
AND the first one of my notes is available on the client
WHEN I read my note
THEN I can see the details of the first one of my notes in the list
```

### It highlights the opened note

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
WHEN I browse the list of my notes
THEN I can see that the specific note is opened
```

### It shows the opened note

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
AND the note is available on the client
WHEN I read my note
THEN I can see the details of that specific note
```

### It indicates that the note is loading

```gherkin
GIVEN the note is not yet available on the client
WHEN I read my note
THEN I can see a loading message
```

The loading message should be: "Loading..."

### It shows the note title placeholder

```gherkin
GIVEN the note is available on the client
AND the note does not have a title yet
WHEN I read my note
THEN I can see a placeholder text where the title of the note should be
```

The placeholder text should be: "Enter a title..."

### It shows the note title

```gherkin
GIVEN the note is available on the client
AND the note has a title
WHEN I read my note
THEN I can see the title of the note
```

### It shows the note content placeholder

```gherkin
GIVEN the note is available on the client
AND the note does not have any content yet
WHEN I read my note
THEN I can see a placeholder text where the content of the note should be
```

The placeholder text should be: "Start typing you note here..."

### It shows the note content

```gherkin
GIVEN the note is available on the client
AND the note has some content
WHEN I read my note
THEN I can see the content of the note
```

### It shows when was the note last edited

```gherkin
GIVEN the note is available on the client
WHEN I read my note
THEN I can see when was the note last edited
```

### It shows error message when the note does not exists

```gherkin
GIVEN I opened the page of a specific note
AND the note does not exist in the database
WHEN I read my note
THEN I can see a "couldn't find" error message
```

The "couldn't find" error message should be: "We couldn’t find this note — it may have been deleted, or you might not have permission to view it. Try opening a different note, or log in with a different account."

### It shows error message when user is not permitted to view the note

```gherkin
GIVEN I opened the page of a specific note
AND the user is not permitted to view the note
WHEN I read my note
THEN I can see a "couldn't find" error message
```

The "couldn't find" error message should be: "We couldn’t find this note — it may have been deleted, or you might not have permission to view it. Try opening a different note, or log in with a different account."

### It opens the login page when clicking on "log in with a different account"

```gherkin
GIVEN I opened the page of a specific note
AND I can see a "couldn't find" error message
WHEN I click on "log in with a different account"
THEN I get to the login page
```

### It opens my note

```gherkin
GIVEN I have created some notes already
AND I opened the notes page
AND the list of my notes is available on the client
WHEN I click on one of my note in the list
THEN I get to the page of that specific note
```

### It opens my other note

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
AND the list of my notes is available on the client
WHEN I select one of my note in the list
THEN I get to the page of that specific note
```

### It opens my note list

```gherkin
GIVEN I have created some notes already
AND I opened the page of a specific note
WHEN I click on the home button
THEN I get to the notes page
```

## Delete my note

### Opens the delete confirmation modal

```gherkin
GIVEN I opened the page of a specific note
AND the note is available on the client
WHEN I click on the delete button
THEN I can see a delete confirmation modal for the note
```

### The delete confirmation modal disappears on cancel

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the cancle button
THEN I no longer see the delete confirmation modal
```

### Does not delete the note on cancel

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the cancel button
THEN the note is still stored in the database
AND I can see the note in the list of my notes
```

### The delete confirmation modal disappears on confirmation

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN I no longer see the delete confirmation modal
```

### Deletes the note on confirmation

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN I no longer see the note in the list of my notes
```

### Navigates to the notes page after confirming deletion

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN I get to the notes page
```

### Shows toast message on successfull deletion

```gherkin
GIVEN I can see a delete confirmation modal for the note
WHEN I click on the confirm button
THEN the note is no longer stored in the database
AND I can see a successfully deleted toast message
```

The successfully deleted toast message should be: "Note permanently deleted."

## Update my note

### Shows disabled save and cancel button

```gherkin
GIVEN the note is available on the client
WHEN I read my note
THEN I can see the disabled save button
AND I can see the disabled cancel button
```

### Shows enabled save and cancel button on title change

```gherkin
GIVEN the note is available on the client
WHEN I change the title of the note
THEN I can see the save button getting enabled
AND I can see the cancel button getting enabled
```

### Shows enabled save and cancel button on content change

```gherkin
GIVEN the note is available on the client
WHEN I change the content of the note
THEN I can see the save button getting enabled
AND I can see the cancel button getting enabled
```

### Disables the buttons on cancel after title change

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the cancel button
THEN I can see the save button getting disabled
AND I can see the cancel button getting disabled
```

### Reverts change in title

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the cancel button
THEN I can see the original title of the note again
```

### Disables the buttons on cancel after content change

```gherkin
GIVEN I have modified the content of the note without saving
WHEN I click on the cancel button
THEN I can see the save button getting disabled
AND I can see the cancel button getting disabled
```

### Reverts change in content

```gherkin
GIVEN I have modified the content of the note without saving
WHEN I click on the cancel button
THEN I can see the original content of the note again
```

### Disables the buttons on save after title change

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the save button
THEN I can see the save button getting disabled
AND I can see the cancel button getting disabled
```

### Saves the new title

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the save button
THEN the new title of the note is stored in the database
AND I can see a successfully saved toast message
```

The successfully saved toast message should be: "Note saved successfully!"

### Saves the new content

```gherkin
GIVEN I have modified the content of the note without saving
WHEN I click on the save button
THEN the new content of the note is stored in the database
AND I can see a successfully saved toast message
```

The successfully saved toast message should be: "Note saved successfully!"

### Shows the new title in the list of notes

```gherkin
GIVEN I have modified the title of the note without saving
WHEN I click on the save button
THEN I can see the new title in the list of my notes
```

### Shows the new title in the list of notes

```gherkin
GIVEN I have just saved my note with modified title
WHEN I browse the list of my notes
THEN I can see the new title in the list of my notes for the modified one
```

### Shows that the note was just updated in the note list

```gherkin
GIVEN I saved my note yesterday
AND I have just saved my note again
WHEN I browse the list of my notes
THEN I can see that the note was last edited today
```

### Shows that the note was just updated in the note details

```gherkin
GIVEN I saved my note yesterday
AND I have just saved my note again
WHEN I read my note
THEN I can see that the note was last edited today
```

## Create a new note

### Creates a new note on notes page

```gherkin
GIVEN I opened the notes page
WHEN I click on the create new note button
THEN a new note is stored in the database
AND I can see a new untitled note in the list of my notes
```

### Navigate to the page of the new note from notes page

```gherkin
GIVEN I opened the notes page
WHEN I click on the create new note button
THEN I get to the page of the new note
```

### Creates a new note on the page of a specific note

```gherkin
GIVEN I opened the page of a specific note
WHEN I click on the create new note button
THEN a new note is stored in the database
AND I can see a new untitled note in the list of my notes
```

### Navigate to the page of the new note from the page of a specific note

```gherkin
GIVEN I opened the page of a specific note
WHEN I click on the create new note button
THEN I get to the page of the new note
```
