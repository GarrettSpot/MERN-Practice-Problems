# MERN Practice Questions

To practice these questions, install the dependencies once from the repository
root. npm workspaces share the root `node_modules` directory while each
question keeps its own `package.json` and test script.

If you have already installed dependencies inside individual question
directories, remove those generated `node_modules` folders once so they do not
take up space alongside the shared installation.

```bash
git clone "https://github.com/GarrettSpot/MERN-Practice-Problems.git"
cd MERN-Practice-Problems
npm install
```

To test your `1-Lok_Sabha` answer from the repository root:

```bash
npm test --workspace lok-sabha
```

Replace `lok-sabha` with the workspace name for the question you want to test:

```bash
npm test --workspace express-pagination
npm test --workspace expense-entry
```

You can also change into a question directory and run its existing scripts
without installing dependencies there:

```bash
cd "1-Lok_Sabha"
npm test
```

When adding a question, add its directory to the root `workspaces` list and
give it a unique `name` in its `package.json`. Run `npm install` from the root
to update the shared lockfile.

## Tips

### Type the question number and then press tab so that your terminal will autocomplete the name

![example of terminal Autocomplete](https://github.com/GarrettSpot/MERN-Practice-Problems/blob/main/assets/autocomplete.png?raw=true)

### Use a Markdown viewer on your IDE to quickly read the problem statement for reference

Most IDEs come with a Markdown Preview function. Here's an example with VS Code:

![how to preview a markdown file](https://github.com/GarrettSpot/MERN-Practice-Problems/blob/main/assets/markdown_preview.png?raw=true)
