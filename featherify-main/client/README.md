# Quickstart

The following commands will help you quickstart the client app on `http://localhost:9000/`

```shell
# MAKE SURE YOU ARE RUNNING THESE COMMANDS IN THE client FOLDER

# install yarn
npm install -g yarn
# install the requirements
yarn install
# run the dev server
yarn dev
```

## Folder Structure

-   **_`lib` _**

It contains external **api calls** and functions which are required for a desired result.
It can also be used for **markdowns**.

-   **_`utils`_**

It contains **default settings** and **functions** which are required not very often.
Instead of putting these functions in a `.tsx` file, it can better to put them in the utils folder.
Functions and Variables in these folder can even be required by the `lib` folder.

-   **_`components`_**

It contains _react functional components_ which are being rendered.

-   **_`contexts`_**

It contains _react context providers_ and _hooks from these contexts_ for a consistent _state_ which can be used across multiple components under the same provider.

-   **_`hooks`_**

It contains _independent react hooks_ which are used to customize the hooks provided by `react`.

-   **_`pages`_**

It contains _nextjs pages_ which are _hydrated_ to `HTML` pages.

-   **_`public`_**

It contains the publically accessible resources. It contains the _images_ folder.
