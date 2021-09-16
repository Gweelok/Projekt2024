# retireditems
The application for Make It Good Agains exchange stations

# Native React expo: Setup guide
This will be a guide on how to start the application on your system, I’ll start the same for every system and change later on.

##Start (every system)
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
expo start
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
expo start
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
expo start
```
And that should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## To run app on phone
To actually run our application, after you’re run the command “expo start” successfully, you’ll have to download the app ”expo go”, and also connect to the same internet as your computer, in it I’ll have a qr code reader, scan your given qr code and presto, app now runs (after a initial installation).


# Code editor: prerequisites
Firstly you'll need to install git, while installing there'll be lots of options, most you don't need to touch except for: "choose default editor for git" which should be set to "visual studio code", "ajust the name of the initial branch" which should be set to "override the default" and the name shoudl be changed to "main".

Secondly you'll install visual studio code, or vscode, this will be the editor we'll be using. Just install it from their website and that's it.

Thirdly, delete the content of the project you previosly installed, just to make the process easier later on.

## Vscode
When all is installed, open up vscode, then choose a theme, any theme. Then click this icon__ 
[ext](https://puu.sh/IbJeB/8232082d98.png)__ 
to access extentions, where you'll want to install the extentions "ES7 React/Redux/...", "React Native Tools" and "ESLint".

Then go into the folder where the project once was, and that should be the first part.

## Git (and github)
Start by opening up git bash and typing the commands:
```
git config --global user.name "<your name here>"
git config --global user.email "<your email here>"
```
Then go back to vscode and press the Source Control button__ 
[src](https://puu.sh/IbJFi/7e3cf406aa.png)__ 
From here, when inside the folder you'd want the project in press the "..." button and choose "clone". 

After that go back into Source Control press the "..." button choose "remote" and "add remote" then again input the github url of the project, then give it the name "origin" for ease of use for later.

Then for fun and to test if it works, add somethign to "App.js" maybe a comment with "// "or something, then in Source Control type something in the message box, usually what you've done, then press the "+" on the files you've changed and then press the tick to commit.

After that press this button:
[idk](https://puu.sh/IbKni/d82e20185b.png)
choose terminal and input this command:
```
git push --set-upstream origin main
```
to set where your commits go, after that when you want to push your commits to the github just go to Source Control and press ... and choose push.

## And that's it
And that should be it, i hope.