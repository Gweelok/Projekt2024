# retireditems
The application for Make It Good Agains exchange stations

# Native React expo: Setup guide
This will be a guide on how to start the application on your system, I’ll start the same for every system and change later on.

## Start (every system)
To start of with, it doesn’t matter what system you have all the first steps are exactly the same, which is to say...

Start by downloadning node.js [here](https://nodejs.org/en/download/).
It’s what’ll hepl your system run the javascript code that the application is using.
It’s important that you install the latest version and from the LST part, not Current part.
If you’re running windows or mac I’ll come up with a installer, in said installer remember to check off the button that more or less says “install extra programs that aren’t already in the system”. This will leave you with less of a headache later on. 
For you linux user, I’d recommend installing node.js through the package manager of your choice.
When that is done, then we’ll have to install the expo cli, which differes from system to system.

## For Windows
Firstly install the project from github and place it somewhere easily accessable from your driver, for example if yor driver is named C:, then the location should be something like:
```
C:\MobileApps\
```
Open up your prefered Shell, if you don’t have any or don’t know what that is Node.js should have installed PowerShell. In the shell, that should look like a terminal, write:
```
npm install -g expo-cli
```
This should install the tool to run our mobile app, after that go to where you placed the app, ẗhis can be done by the command:
```
cd ~
```
followed by:
```
cd <LOCATION>
```
for example
``` 
cd /MobileApps/retireditems
```
Remember to go into the folder that the app is in.Then to start the mobile app run the commands:
```
npm install
npx expo start
```
If it nags about, “now allowing unsigned scripts” run the command:
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
When that is said and done, that should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## For Linux
You’ll probably install npm on the same time but if not, remember to do that. When that is done, run the command:
```
npm install -g expo-cli
```
After that, goto where the app is with cd, and if you don’t know how to do that run the commands:
```
cd ~
cd <Location>
```
e.g.
```
cd \MobileApps\retireditems
```
Remember to go into the folder that the app is in, efter that run the commands:
```
npm install
npx expo start
```
And pray with all your might to your lord and savoir Richard “Milos” Stallman that it worked. That should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## For Mac OS
Then open up your terminal which is located in “Utilities” where your applications are, or use Spotlight to find the terminal, after opening up terminal, and if everything is good and well , run the command:
```
npm install -g expo-cli
```
This should install the tool that’ll let you run the app. Then go to the place where you have the app in your terminal, by using commands:
```
cd ~
cd <path to the folder>
```
Remember to go into the folder wher ethe app is, and then to start the system that’ll let you run the mmobile app, that run the command:
```
npm install
npx expo start
```
And that should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## To run app on phone
To actually run our application, after you’re run the command “npx expo start” successfully, you’ll have to download the app ”expo go”, and also connect to the same internet as your computer, in it I’ll have a qr code reader, scan your given qr code and presto, app now runs (after a initial installation).


# Code editor: prerequisites
Firstly you'll need to install git, while installing there'll be lots of options, most you don't need to touch except for: "choose default editor for git" which should be set to "visual studio code", "ajust the name of the initial branch" which should be set to "override the default" and the name shoudl be changed to "main".

Secondly you'll install visual studio code, or vscode, this will be the editor we'll be using. Just install it from their website and that's it.

Thirdly, delete the content of the project you previosly installed, just to make the process easier later on.

## Vscode
When all is installed, open up vscode, then choose a theme, any theme. Then click this icon [image 1](https://puu.sh/IbJeB/8232082d98.png)<br /> 
to access extentions, where you'll want to install the extentions "ES7 React/Redux/...", "React Native Tools" and "ESLint".

Then go into the folder where the project once was, and that should be the first part.

## Git (and github)
Start by opening up git bash and typing the commands:
```
git config --global user.name "<your name here>"
git config --global user.email "<your email here>"
```
Then go back to vscode and press the Source Control button 
[image 2](https://puu.sh/IbJFi/7e3cf406aa.png)<br />
From here, when inside the folder you'd want the project in press the "..." button and choose "clone". 

After that go back into Source Control press the "..." button choose "remote" and "add remote" then again input the github url of the project, then give it the name "origin" for ease of use for later.

Then for fun and to test if it works, add somethign to "App.js" maybe a comment with "// "or something, then in Source Control type something in the message box, usually what you've done, then press the "+" on the files you've changed and then press the tick to commit.

After that press this button: [image 1](https://puu.sh/IbKni/d82e20185b.png)<br />
choose terminal and input this command:
```
git push --set-upstream origin main
```
to set where your commits go, after that when you want to push your commits to the github just go to Source Control and press ... and choose push.

## And that's it
And that should be it, i hope, just remember to "pull" every time you open up the project, just to make sure there's no problems.



# Databases and you
To make use of the database i've implemented you'll want to import verying you're gonna need, which is done by writing this line with the other imports:
```
import { database } from './utility/database'
```
To access a database you HAVE to run the function:
```
setTable( < name of table here > )
```
On the database there's some built in functions that are already accessable, to access them you'll want to start each function with 
```
database.<function name>
```
Actions you can do include:
* "insertData(<object with data>)" inserts data into the table with the given data in item
* "getData(<data setting function>)" selects all data from the table and puts them into the function that you give it
* "getSpecificData(<id>, <data setting function>)" selects a specific data determined by the id you give it and selects said data and sets it with the function you give it
* "updateData(<object with data>)" updates the data with the same id as the one you give it
* "deleteData(<id>)" deletes a datapoint with the same id 
* "getTable()" creates and sets the table if there is none
* "dropData" which deletes all data in a given table
* "vacuums" cleans up database file

If you want some quick data to work with you can import the "TestData" function and run it once.

## to create your own sql action
To do any actions on the database you first need to start a transaction, and then give it the sql string you'd want it to execute, this is done with:
```
<variable name here>.transaction(tx => {
			tx.executeSql(
				<sql you'd want to run>,
				[<input(s)>],
				<what happens when it's successful>, 
				<what happens when it's unsuccessful>
			)
		}
	)
```
In the success or error state i'll give you some sql text which isn't too relevant for us and the result, to access the result, one very efffective way i've learned is by doing th following:
```
(txObj, results/error) => { <your code here> }
```

Remember, the results you get from the database are formatted like this:
```
{
  insertId,
  rowsAffected,
  rows: {
    length,
    item(),
    _array,
  },
}
```
it also comes with some prebuild functions:
* insertId -- The row ID of the row that the SQL statement inserted into the database, if a row was inserted.
* rowsAffected -- The number of rows that were changed by the SQL statement.
* rows.length -- The number of rows returned by the query.
* rows.item(number) -- rows.item(index) returns the row with the given index. If there is no such row, returns null.
* rows.array -- The actual array of rows returned by the query. Can be used directly instead of getting rows through rows.item().
This means that if you want to access a specific item (which would be formatted as an item) you would run the line:
```
results.rows.item(<number>)
```
that should be everything you'd need to know if you want to work with sql, best of luck.
# Branching and you: the best way to avoid error in code when lots of people code
Something important that i grievously forgot is to talk about branches, a very practical system that helps avoid code error that might occur when more than one person is working on code and they're not coordinating.

To start a new branch and check it out you can use the following command:
```
git checkout -b <name here>
```
which is the same as:
```
git branch <name here>
git checkout <name here>
```
or just click "..." in source control and press the "branch" option and choose "new branch".
To switch between branches use the code
```
git checkout <name here> 
```
and to do it in vscode click "checkout to..." and choose the branch you want.
Just a heads up, you can't branch if you have uncommited changes, so either stash it away or commit it.

This is another important point to remember: when you switch branches, Git resets your working directory to look like it did the last time you committed on that branch. It adds, removes, and modifies files automatically to make sure your working copy is what the branch looked like on your last commit to it.

## github merging
Github has a more formal way of mergin branches, in "pull requests" you can create a formal merge between two branches where you'll be able to see what changes will happen. this is more used when there's a head programmer or somebody who has to check that nothing goes wrong when the merge happens. I'll probably not be very important for us now, but you can test it out if you will.


press "pull request" -> press "compare and pull request" -> choose which way it should merge (branch you want to merge into <- branch with changes you want into the first branch) -> write a comment on what's happening -> check there's no conflicts -> press "create pull request" -> and done

To actually merge the branches together you need to press "confirm pull request" which should come up after your pull request is created. But yeah that's about it for github merging.

## Manual merging
When you're done working on the branch and want to put your new changes into the main branch, or want to get some of the new features from the main branch into your branch use the following command:
```
git checkout <branch you want to merge into>
git merge <branch with changes you want into the first branch>
```
Or by pressing "merge branch..." in source control
When that is done, if you're done with the branch use the command, to delete your old branch:
```
git branch -d <name here>
```
or in source control. And that should be it, if there's any merge conflicts then it should be easy to see what to keep and what not to keep if using vscode.
					
# Troubleshooting 

On mac when running application (using expo start), you might recieve the error: 
```
Error: EMFILE: too many open files, watch
```
To solve this, you need to install watchman:
```
brew update
brew install watchman
```
					
