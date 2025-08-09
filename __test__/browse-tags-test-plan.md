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

## Browse my tags

### Open the tags page

```gherkin
GIVEN I opened the notes page
WHEN I click on the tags button
THEN I get to the tags page
```

- Components to test:
  - BottomNavigation
