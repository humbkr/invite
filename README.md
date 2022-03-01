# Invite
Smart email invitation case study

A live demo is available [here](https://humbkr.github.io/invite/).

## Assignment

### Goal
Create an invite popup allowing users to invite their teammates or any other people via email.

Time constraint: 2 workdays

### Requirements
##### Technical
- Create React App
- Chakra UI
- Typescript

##### Functional
Main page is a landing page with a single "Invite teammates" button.  

On clicking the button, a popin opens. This popin contains:
- a combobox letting users add multiple teammates at once
- an "invite" button in disabled state

When the user starts typing, the submit button remains disabled until a valid email or teammate 
is entered.

After the user has filled a proper email address (based on an email regex), or a teammate has been
found in the team listing based on what was typed, a dropdown expands and a teammate / email can
be selected.

When selecting a name or email, it is added to the selection of the combobox.

When clicking on the Invite button, the popin is closed and the initial landing page is updated with 
a raw list of the added users (no need to design it).

#### Element provided
- a fake teammates API
- a color palette
- wireframes (7)
- Figma mockups (2)

## Evaluation
Case was evaluated based on the following:
### UI / UX
Only basic partial mockups were provided, missing functionalities were to be implemented by
extrapolating on the available designs.  
Gaps in the specs were to be filled when needed (keyboard shortcuts, errors, animations, edge cases, ...).

### Code
Code must be stable, organized, and maintainable.


## Development

### Quick start
```shell
git clone git@github.com:humbkr/invite.git
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Tech stack
- [Create React App](https://github.com/facebook/create-react-app)
- [Chakra UI](https://github.com/chakra-ui/chakra-ui)
- [Typescript](https://github.com/microsoft/TypeScript)

### Dependencies

This project uses yarn 1 to manage its dependencies.

### Code quality
This project uses prettier and eslint.  
Eslint with the --fix flag and Typescript checks are automatically ran on commit.  
Tests are automatically run on push.

## Possible improvements
- Add internationalization
- Add more animations
- Up test coverage to at least 80%
- Improve code linting configuration
- Highlight characters the user has typed when displaying the search results
