<h1  align='center'>
CMD-Shortener
</h1> 
<p align='center'>
<img src='./assets/logo.svg' >
</p>
<h4 align='center'>
Tool to define shorthand for your frequently used and tediously long commands.
</h4>

### Usage
Define shorthand :
```
csh d <shorthand> "<command>"
```
or
```
csh define <shorthand> "<command>"
```

Run command using shorthand :
```
csh r <shorthand>
```
or
```
csh run <shorthand>
```

List all defined shorthands :
```
csh l
```
or
```
csh list
```

### Example

```
csh d watch "echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances"
```

```
csh r watch
```

### Development

Before starting, install these dependencies if you don't have them:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/download/package-manager/), latest 8.x
  (LTS) version
* [npm](https://www.npmjs.com/get-npm), latest 6.x (LTS) version

Then, run the commands below in your terminal:
```
git clone https://github.com/AdityHirapara/cmd-shortener
cd cmd-shortener
npm install
```

To run:
```
sudo npm link
```

##### Open issues and PRs, feel free to contribute.<br>Also if you liked it, then do star the repo and share with your friends!
