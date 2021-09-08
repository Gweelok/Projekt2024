# retireditems
The application for Make It Good Agains exchange stations

# Setup guide
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
To actually run our application, after you’re run the command “expo start” successfully, you’ll have to download the app ”expo go”, in it I’ll have a qr code reader, scan your given qr code and presto, app now runs (after a initial installation).

