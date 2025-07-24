<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>MESS_MANAGEMENT_APP</h1>

[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000000?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Appwrite](https://img.shields.io/badge/Appwrite-4B4B4B?style=flat-square&logo=appwrite&logoColor=white)](https://appwrite.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="left">
	<img src="https://img.shields.io/github/license/utkarshml/Mess_management_app?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/utkarshml/Mess_management_app?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/utkarshml/Mess_management_app?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/utkarshml/Mess_management_app?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

The Mess Management App is a web-based application designed to streamline the operations of mess facilities. This project provides an efficient way to manage daily meal scheduling, attendance, billing, and user feedback, thereby reducing administrative tasks and improving overall efficiency.



---

##  Features

- User Authentication: Secure login and registration for users.

- Role-Based Access: Different access levels for administrators, staff, and regular users.

- Meal Scheduling: Plan and manage meal timings and menus.

- Attendance Tracking: Keep track of who attends each meal.

- Billing & Payment Management: Automated generation of bills and management of payments.

- Dashboard & Analytics: Comprehensive dashboards to monitor operation statistics.

- Feedback System: Collect and review user feedback to improve service quality.

---

##  Project Structure

```sh
└── Mess_management_app/
    ├── app
    │   ├── (auth)
    │   ├── +not-found.tsx
    │   ├── ErrorBoundary.tsx
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   ├── mess
    │   └── student
    ├── app.config.ts
    ├── app.json
    ├── assets
    │   └── images
    ├── bun.lock
    ├── components
    │   ├── Calender.tsx
    │   ├── LIstCalender.tsx
    │   ├── Loader.tsx
    │   ├── MealCards.tsx
    │   ├── SearchBar.tsx
    │   ├── StudentDetails.tsx
    │   ├── StudentHeader.tsx
    │   ├── StudentList.tsx
    │   ├── profileForm
    │   └── searchInput.tsx
    ├── hooks
    │   ├── useAuth.tsx
    │   └── useFrameworkReady.ts
    ├── lib
    │   └── appwrite.ts
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    └── types
        ├── auth.ts
        └── custom.d.ts
```

## App View Video

Watch the video below to see the app demonstration in action.

[![Watch the Video](https://res.cloudinary.com/div94qlyl/image/upload/c_thumb,w_200,g_face/v1744137983/videoframe_97221_nefl8x.png)](https://www.youtube.com/shorts/p05mQ8RMonc))

###  Project Index

<details open>
	<summary><b><code>MESS_MANAGEMENT_APP/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app.json'>app.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app.config.ts'>app.config.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- types Submodule -->
		<summary><b>types</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/types/custom.d.ts'>custom.d.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/types/auth.ts'>auth.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- lib Submodule -->
		<summary><b>lib</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/lib/appwrite.ts'>appwrite.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- components Submodule -->
		<summary><b>components</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/Calender.tsx'>Calender.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/LIstCalender.tsx'>LIstCalender.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/StudentList.tsx'>StudentList.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/StudentDetails.tsx'>StudentDetails.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/Loader.tsx'>Loader.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/searchInput.tsx'>searchInput.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/StudentHeader.tsx'>StudentHeader.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/MealCards.tsx'>MealCards.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/SearchBar.tsx'>SearchBar.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>profileForm</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/profileForm/ImagePicker.tsx'>ImagePicker.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/components/profileForm/FormInput.tsx'>FormInput.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- hooks Submodule -->
		<summary><b>hooks</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/hooks/useAuth.tsx'>useAuth.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/hooks/useFrameworkReady.ts'>useFrameworkReady.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- app Submodule -->
		<summary><b>app</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/_layout.tsx'>_layout.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/ErrorBoundary.tsx'>ErrorBoundary.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/+not-found.tsx'>+not-found.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/index.tsx'>index.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>(auth)</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/(auth)/_layout.tsx'>_layout.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/(auth)/register.tsx'>register.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/(auth)/login.tsx'>login.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>student</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/student/Meals.tsx'>Meals.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/student/History.tsx'>History.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
					<details>
						<summary><b>(tabs)</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/student/(tabs)/_layout.tsx'>_layout.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/student/(tabs)/profile.tsx'>profile.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/student/(tabs)/index.tsx'>index.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>mess</b></summary>
				<blockquote>
					<details>
						<summary><b>attendance</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/attendance/_layout.tsx'>_layout.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/attendance/index.tsx'>index.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>UpdateProfile</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/UpdateProfile/index.tsx'>index.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>(tabs)</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/(tabs)/_layout.tsx'>_layout.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/(tabs)/profile.tsx'>profile.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/(tabs)/students.tsx'>students.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/utkarshml/Mess_management_app/blob/master/app/mess/(tabs)/index.tsx'>index.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with Mess_management_app, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm


###  Installation

Install Mess_management_app using one of the following methods:

**Build from source:**

1. Clone the Mess_management_app repository:
```sh
❯ git clone https://github.com/utkarshml/Mess_management_app
```

2. Navigate to the project directory:
```sh
❯ cd Mess_management_app
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run Mess_management_app using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/utkarshml/Mess_management_app/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/utkarshml/Mess_management_app/issues)**: Submit bugs found or log feature requests for the `Mess_management_app` project.
- **💡 [Submit Pull Requests](https://github.com/utkarshml/Mess_management_app/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/utkarshml/Mess_management_app
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/utkarshml/Mess_management_app/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=utkarshml/Mess_management_app">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
