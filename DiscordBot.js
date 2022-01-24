const { Client, MessageEmbed } = require("discord.js");
const { Notification, ipcMain } = require("electron");

const TOKEN = "ODMwMTM2NTQ3NzU5NzUxMjA5.YHCS6A.cz-zH6mbhxBrqrnbhQjt_KZoCFU";
const CHANNELID = "844267252186087444";
const drinkMessageID = [];
const emojiToTrack = '☕'

const reactionFilter = reaction => {
  return reaction.name === emojiToTrack;
};

class DiscordBot {
  constructor(win, token = TOKEN) {
    this.win = win;
    this.token = token;
    this.client = new Client();

    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
   // this.client.on("reaction",this.onReaction.bind(this));
    this.client.login(token);

  }

//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\| Don't touch for now
  onReady() {
    console.log("TeaBot ready!");
  }
  showNotification(message = "Notification from the Main process") {
    const notification = {
      title: "Basic Notification",
      body: message,
    };
    new Notification(notification).show();
  }
  // function used to send messages originating in p5 to discord
  sendMessageToDiscord(data) {
    var channelToSend = this.client.channels.cache.get(CHANNELID);
    channelToSend.send(data);
  }
//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> All the messages that cause TeaBot to do something

  onMessage(message) {
    var channelToSend = this.client.channels.cache.get(CHANNELID);
    // when discordbot receives a message it calls the fromDiscordBot function in p5 and relays the message to p5
    this.win.webContents.send("fromDiscordBot", message.content);
    
    if (message.content.includes("!hello")) {  
      if (message.author == this.client.user) { //Prevents message loop with self
        return;
       }
      else{
        
        let greeting = "Hello, I am TeaBot mediator of the Rapour System. Let's have a drink together! React with 🍻 to begin" ;
        channelToSend.send(greeting).then(sentGreeting => {sentGreeting.react("🍻");});
  
      }
    }

    if (message.content.includes("!hack")) {  
      if (message.author == this.client.user) { //Prevents message loop with self
        return;
       }
      else{
        
        let greeting = "<@844266084286070864> requests a drink!" ;
        channelToSend.send(greeting);
  
      }
    }

    if (message.content.includes("!Hack")) {  
      if (message.author == this.client.user) { //Prevents message loop with self
        return;
       }
      else{
        
        let greeting = "<@509914277734383658> accepted the drink." ;
        channelToSend.send(greeting);
  
      }
    }

    if (message.content.includes("!pour")) {  
      if (message.author == this.client.user) { //Prevents message loop with self
        return;
       }
      else{
        let pourCommand = message.content.split(" ");
        var person = pourCommand[1];
        let pourReply = message.author.toString() +  " pours a drink for " +  person.toString() ;
        channelToSend.send(pourReply);
        channelToSend.send("L");
  
      }
    }

    
    if (message.content.includes("!drink")) {  
      if (message.author == this.client.user) { //Prevents message loop with self
        return;
       }
      else{
        
        let drinkReply = message.author.toString() +  " would like a drink!" ;
        channelToSend.send(drinkReply).then(sentDrinkReply => { sentDrinkReply.react("☕"); });
        channelToSend.send("L");
      }
    }
        
  
      
      
      
    

    //for "!hello" and "!drink"
    //reactioncollector
    //https://discord.js.org/#/docs/main/stable/class/ReactionCollector 
    //https://gist.github.com/megadrive/3d9fd0f3f0e7d9db5c7af8b4a55a62ec


  }




/*
  onReaction(reply, sender){
    
    let msg = await sender.reply(reply);
    await msg.react('☕');
   

    msg.createReactionCollection(r => ['☕'].includes(r.emoji.name))
      .on('collect', r => { 
        if (r.emoji.name == '☕') {}
          channelToSend.send('H');
      });

  }*/
  /*
  onReaction(payload){
    var channelToSend = this.client.channels.cache.get(CHANNELID);
    this.win.webContents.send("fromDiscordBot", message.content);
    do {
      messageID = parseInt(drinkMessageID[i]);
      if (payload.message_id == messageID) {
        var reactionCount = reactions.get("☕");
      console.log(reationCount);
    }
    }
    while(i < drinkMessageID.size);
  }
  */

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}


module.exports = { DiscordBot };
