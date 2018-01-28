const Discord = require('discord.js');
const client = new Discord.Client();

var { prefix } = require('./config.json');
var logChannel = "welcome-goodbye";
var modCase = "0";
var catEmbed;
var ast, mess;
var modlogs;
var tnum = 1;
client.on('ready', () => {
    // This will trigger when the bot comes online.
    console.log(`${client.user.tag} Is Active!`);
    console.log(`----------------`);
    client.user.setPresence({game: {name: `${prefix}new | ${prefix}invite`, type: 0}});
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    
});

client.on("guildMemberAdd", (u) => {
    let channel = u.guild.channels.find("name", logChannel)
    
    if (!channel) {
      u.guild.createChannel(logChannel, "text").then(async channel=> {
    u.send (`Welcome to ${u.guild.name}. Have a great time here!`)
    channel.send(`:tada: Welcome ${u.user} (${u.user.id}) to **${u.guild.name}**!`);        
      })
      };

    u.send (`Welcome to ${u.guild.name}. Have a great time here!`)
    channel.send(`:tada: Welcome ${u.user} (${u.user.id}) to **${u.guild.name}**!`);
});
  
client.on("guildMemberRemove", (u) => {
    let channel = u.guild.channels.find("name", logChannel)

    if (!channel) {
      u.guild.createChannel(logChannel, "text").then(async channel=> {
    u.send (`Welcome to ${u.guild.name}. Have a great time here!`)
    channel.send(`:wave: ${u.user} (${u.user.id}) just left **${u.guild.name}**. How sad.`);   
      })
      };

    channel.send(`:wave: ${u.user} (${u.user.id}) just left **${u.guild.name}**. How sad.`);
});

// Commands!
client.on('message', async message => {

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    /*
    if(message.content.startsWith(regex + "help")) {
    	return message.reply(`My Command Prefix is \`${prefix}\`. Run \`${prefix}help\` for help with my commands!`);
    }
    if(message.content.startsWith(regex)) {
    	return message.reply(`My Command Prefix is \`${prefix}\`. Run \`${prefix}help\` for help with my commands!`);
    }
    */
    if (message.channel.type === 'dm') { return message.reply ("You cannot use my commands in DMs!") }
    let command = message.content.split(" ")[0].toLowerCase();
    command = command.slice(prefix.length);

    let args = message.content.split(/ +/).slice(1);

    if (command === "close") {
      if (message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")) {
        message.channel.delete();
        message.author.send (`✅ Closed Ticket \`${message.channel.name}\``)
      }
    }
    if (command === "new") {
      let support = message.guild.roles.find("name", "Support Team");
      if (!support) {
        message.reply ("I can't find the role \"Support Team\"!");
        return;
      }
      if(!message.member.roles.has(support.id)) {
        message.reply ("You do not have permission to use this command!")
      }
message.guild.createChannel("ticket-"+tnum, 'text')
  .then(channel => {
channel.overwritePermissions(message.guild.id, {
  READ_MESSAGES: false
})
channel.overwritePermissions(message.author, {
  READ_MESSAGES: true,
  MANAGE_CHANNELS: true
})
channel.overwritePermissions(support.id, {
  READ_MESSAGES: true,
  MANAGE_CHANNELS: true
})
channel.send("Thank you for creating a ticket. Please Describe Everything in as full detail as you can.")
message.channel.send ("✅ Created channel " + channel.toString() + "!")
tnum++
    })
}
    if (command === "commission") {
if(!message.member.roles.some(r=>["CEO", "PR", "CMO"].includes(r.name)) ) {
  if (message.author.id !== "345312965508988928") {
  return message.reply ("You do not have permissions to use this command!")
  }
}
      let channel = client.channels.get('404636868861493268');
      if (!channel) {
        return message.reply ("I couldn't find the channel")
      }
      channel.send(`__**New Commision!**__\n\nAdded by ${message.author.tag}\n**Department(s):** ${departments}**Description:** ${description.join(' ')}`);

      if (!message.mentions.roles) {
        message.reply ("You need to mention a role!")
      }
      if (args.length<2) {
        message.reply ("You need to mention a role and things needed!");
        return;
      }
    let description = args.slice(message.mentions.roles.size);
    let departments = message.mentions.roles.map().join(', ');
    let roles = message.mentions.roles.map(role =>
        role.members.map (member => {
                if (member.user.bot) return;
                member.send (`__**New Commision!**__\n\nAdded by ${message.author.tag}\n**Department(s):** ${departments}**Description:** ${description.join(' ')}`);
            }
        )
      )
    }
    if (command === "eval") {
          if(message.author.id !== "345312965508988928") { return message.channel.send (`You do not have permission to use this, ${message.author}, you silly billy!`) };
// Clean
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
// End it
          try {
          const code = args.join(" ");
          let evaled = eval(code);

          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

            message.channel.send(`__**Output**__\n\n` + `\`\`\`js\n` + clean(evaled) + `\`\`\``);
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
    }
    if (command === "invite") {

	let invChannel = message.channel.id;
	message.guild.channels.get(invChannel).createInvite({
    temporary: false,
    maxAge: 0,
    maxUses: 0,
    unique: true,
    reason: `Created invite on demand of ${message.author.tag}`
}).then(invite =>
    
    message.channel.send (`You can invite your friends to **${message.member.guild.name}** using **${invite.url}**!`)
	);

    }
    if (command === "ping") {
        
        message.channel.send('Pinging...').then(async (msg) => {

  const embed = {
  "title": "Pong!",
  "description": "🏓",
  "color": 65393,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.displayAvatarURL,
    "text": client.user.tag
  },
  "author": {
    "name": message.author.tag,
    "icon_url": message.author.displayAvatarURL
  },
  "fields": [
    {
      "name": "Bot Latency",
      "value": `${msg.createdTimestamp - message.createdTimestamp} ms`,
      "inline": true
    },
    {
      "name": "API Latency",
      "value": `${Math.round(client.ping)} ms`,
      "inline": true
    },
    {
      "name": "What does this mean?",
      "value": `This means that the bot took ${msg.createdTimestamp - message.createdTimestamp} ms to respond to your command, and it took ${Math.round(client.ping)} ms for Discord API. This is the speed at which the bot responds to you, after you sent your command!`
    }
  ]
};


          await msg.edit({ embed });
    
        });
        
    }

        if (command === "remove" || command === "purge" || command === "clear" || command === "delete" || command === "prune") {
        
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Owner", "Admin", "Mod"].includes(r.name)) ) {

    	if (message.author.id !== "345312965508988928") {

      return message.reply("Sorry, you don't have permissions to use this!");

      		}
  		}

        	modlogs = message.guild.channels.find('name', 'mod-logs');
            let num1 = parseInt(args[0]);
    if (!modlogs) {
      message.guild.createChannel('mod-logs', "text");
      };
          modlogs = message.guild.channels.find('name', 'mod-logs');

    if(!num1) { return message.reply (`You need to specify a number of messages to delete.\nCommand usage: \`${prefix}purge num\``)}
    if(isNaN(num1) || num1>99 || num1<1) { return message.reply (`${num1} is an invalid number of messages to delete between 1 and 99.\nCommand usage: \`${prefix}purge num\``)}
            
            message.channel.bulkDelete(num1 + 1, true);

            if (args[0] === "1") {

                message.channel.send("Deleted " + num1 + " message.").then(msg => msg.delete(2000));

            } else if (num1 > 1) {

                message.channel.send("Deleted " + num1 + " messages.").then(msg => msg.delete(2000));

            }

            modCase++
            modlogs.send (`__**Case ${modCase}**__\n\n**Action:** Purge (Bulk Delete)\n**Messages Deleted:** ${num1}\n**Time:** ${new Date()}\n**Moderator:** ${message.author.tag}`)
            
        }

        // Mod Commands

       // Start Kick
        if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Owner", "Admin", "Mod"].includes(r.name)) ) {

    	if (message.author.id !== "345312965508988928") {
        if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
          console.log(message.author.tag + " has permissions to kick/admin")
        } else {
      return message.reply("Sorry, you don't have permissions to use this!");
    }
      
      		}
  		}

    let member = message.mentions.members.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    if (!modlogs) {
    	return message.reply (`I could not find a channel called #mod-logs. Please create one to use this command`)
    }
    if(!member)
      return message.reply("Please @mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    member.send (`You have been Kicked from ${message.guild} for ${reason}`)    
    member.kick(`${reason} - On command of ${message.author}`)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
	message.channel.send (`**✅ ${member} was Kicked for \`${reason}\`**`).then(msg => msg.delete(3000));
            
        modCase++
        modlogs.send (`__**Case ${modCase}**__\n\n**Action:** Kick\n**User:** ${member}\n**Time:** ${new Date()}\n**Moderator:** ${message.author.tag}`)

  }

  // End Kick
  // Start Unban

  if(command === "unban") {

	let reason = args.slice(1).join(' ');
  	let id = args[0];
  	    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Owner", "Admin", "Mod"].includes(r.name)) ) {

    	if (message.author.id !== "345312965508988928") {

      return message.reply("Sorry, you don't have permissions to use this!");
      
      		}
  		}
  	if (!id) {
  		message.reply("You must have an ID to unban!");
  		return;
  	};
  	message.guild.unban(id, `${reason} - On command of ${message.author}`)
  .then(user => message.channel.send(`**✅ ${id} was Unbanned for \`${reason}\`**`).then(msg => msg.delete(3000)))
  .catch(err => message.channel.send (`I couldn't unban ${id} because: \`\`\`js\n${err}\`\`\``));
  }
  // End Unban
  // Start Ban
  if(command === "ban") {

    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Owner", "Admin", "Mod"].includes(r.name)) ) {

    	if (message.author.id !== "345312965508988928") {

      return message.reply("Sorry, you don't have permissions to use this!");
      
      		}
  		}
    
    let member = message.mentions.members.first();
    let modlogs = message.guild.channels.find('name', 'mod-logs');
    if (!modlogs) {
    	return message.reply (`I could not find a channel called #mod-logs. Please create one to use this command`)
    }
    if(!member)
      return message.reply("Please @mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    
    member.ban(`${reason} - On command of ${message.author}`)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(`**✅ ${member} was Banned for \`${reason}\`**`).then(msg => msg.delete(3000));
    member.send (`You have been banned for \`${reason}\``)
  }
  // End Ban

});
/*
client.on("message", message => {
  if (message.author.id == client.user.id) return
const swearWords = ["darn", "shucks", "frak", "shite"];
if( swearWords.some(word => message.content.includes(word)) ) {
  var found = swearWords.find(function(swear) {
  return message.content.includes(swear);
  });
  mess = message.content.replace(found, "\\*".repeat(found.length));
  message.channel.send(`**${message.author.tag}:** ${mess}`)
  //message.channel.send(`**${message.author.tag}:** 🙊 Just said a bad word (${ast.join('')})`);
  message.delete();
  }
});
*/
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
