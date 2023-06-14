Idea: make interface in which you see the chat with chatgpt, with an main textfield in which
you can insert data from different sources into any row of the textfield, helping the user to
create a request that combines pieces of data from different sources together.

// Click add snippet
// Open modal with snippet form
// + Cancel + Add buttons
// onCancel => close modal + empty form data
// onAdd =>
//  send request
//  on success => call onAddSnippet, which leads to calling a function inside
//	SnippetOverview, where the new snippet is added to the list of snippets
//  on error => 400 > show validation errors !400 > show message that something went wrong

// Click delete snippet
//   - set snippet to delete full
//   - set show modal
// In modal ask for confirmation, show snippet by name
// on confirm => send request to delete
//  - on success => call onDeleteSnippet with snippet id and parent folder ids, which 
//    leads to calling a function inside SnippetOverview, where the deleted from the 
//    list of snippets
//  - on error => show message that something went wrong

// Click edit snippet
//   - set snippet to delete full
//   - set show modal
// Open modal with filled snippet form + Cancel + Edit buttons
//   - on edit => send backend request
//     - on success => call onEditSnippet(newSnippet), which leads to calling a function inside
//	SnippetOverview, where the existing snippet in the list of snippets is switched with new one
//     - on error => 400 > show validation errors !400 > show message that something went wrong
//   - on cancel > close form and clear form data                               



---

> prompt (+ all of the above is nothing)
< answer
> all of the above + new prompt
< answer
> all of the above + new prompt
< answer

Probably have a Prompt and Answer model, linked to a chat

Models:
- Chat
- Prompt
- Answer
  - maybe prompt and answers should be polymorphic models,
    of the instance Message? As they are very similar, probably
    only the direction if different and answers always follow 
    prompts while prompts always follow answers
